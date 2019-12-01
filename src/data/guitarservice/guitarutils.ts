import { Guitar } from '../../interfaces/models/guitar';
import { Pickup } from '../../interfaces/models/pickup';
import { Project } from '../../interfaces/models/project';

import {
    millisecondsToFriendlyString,
    mostCommonString,
    randomElementWithSeed,
    roundToHundredths
} from '../../infrastructure/datautils';

const defaultString = 'None';
const unknownString = 'Unknown';
const minDefault = 9999999;
const pastDate = "01/11/1977";

export function isGuitar(guitar: any): guitar is Guitar {
    return guitar.make !== undefined;
}

export function isProject(guitar: any): guitar is Project {
    return guitar.projectStart !== undefined;
}

function isAcousticPickup(pickups: ReadonlyArray<Pickup>): boolean {
    if (pickups.length < 1) {
        return true;
    }

    if (pickups.length > 1) {
        return false;
    }

    if (pickups[0].mount === 'Neck'
        || pickups[0].mount === 'Under-saddle'
        || pickups[0].type === 'Piezo') {
        return true;
    }

    return false;
}

export function isAcoustic(guitar: Guitar): boolean {
    const acousticStyle = [ 'Acoustic', 'Flattop', 'Hollowbody', 'Archtop' ];

    return acousticStyle.includes(guitar.bodyStyle)
        ? isAcousticPickup(guitar.pickups ?? [])
        : false;
}

export function isElectric(guitar: Guitar): boolean {
    return !isAcoustic(guitar);
}

export function hasCase(guitar: Guitar): boolean {
    return guitar.case
        ? guitar.case.id !== undefined
        : false;
}

export function hasPickups(guitar: Guitar): boolean {
    return guitar.pickups
        ? guitar.pickups.length > 0
        : false;
}

export function hasPurchasePrice(guitar: Guitar): boolean {
    if (guitar.purchasePrice) {
        return true;
    }

    if (isProject(guitar)) {
        if (guitar.purchaseComponentPrice) {
            return true;
        }
    }

    return false;
}

export function getPickupCount(guitar: Guitar): number {
    if (!hasPickups(guitar)) {
        return 0;
    }

    if (guitar.pickups) {
        return guitar.pickups.length;
    }

    return 0;
}

export function mostPickups(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    let maxPickupCount = 0;
    for (const guitar of guitars) {
        if (!hasPickups(guitar)) {
            continue;
        }

        if (!max) {
            max = guitar;
            maxPickupCount = getPickupCount(max);
            continue;
        }

        if (maxPickupCount < getPickupCount(guitar)) {
            max = guitar;
            maxPickupCount = getPickupCount(max);
        }
    }

    return max
        ? `${max.name} (${maxPickupCount} pickups)`
        : defaultString;
}

export function mostFrets(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    for (const guitar of guitars) {
        if (!guitar.numberOfFrets) {
            continue;
        }

        if (!max) {
            max = guitar;
            continue;
        }

        if ((max.numberOfFrets ?? 0) < guitar.numberOfFrets) {
            max = guitar;
        }
    }

    return max
        ? `${max.name} (${max.numberOfFrets} frets)`
        : defaultString;
}

export function leastFrets(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    for (const guitar of guitars) {
        if (!guitar.numberOfFrets) {
            continue;
        }

        if (!min) {
            min = guitar;
            continue;
        }

        if ((min.numberOfFrets ?? minDefault) > guitar.numberOfFrets) {
            min = guitar;
        }
    }

    return min
        ? `${min.name} (${min.numberOfFrets} frets)`
        : defaultString;
}

export function averageFrets(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const items = guitars.filter(c => c.numberOfFrets);
    const averageFrets =
        items.reduce((avg, g) =>
            avg + (g.numberOfFrets ?? 0),
            0) / items.length;

    return averageFrets
        ? `${Math.round(averageFrets)}`
        : defaultString;
}

function getStringAgeDuration(guitar: Guitar): number {
    if (guitar.strings) {
        if (guitar.strings.lastChangeDate) {
            return Date.now() - Date.parse(guitar.strings.lastChangeDate);
        } else if (guitar.strings.name.includes('Factory')) {
            if (!guitar.purchaseDate) {
                return 0;
            }

            return Date.now() - Date.parse(guitar.purchaseDate);
        }
    }

    return 0;
}

export function getStringAge(guitar: Guitar): string {
    const duration = getStringAgeDuration(guitar);

    return duration > 0
        ? millisecondsToFriendlyString(duration)
        : unknownString;
}

export function averageStringAge(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let total = 0;
    let count = 0;
    for (const guitar of guitars) {
        const age = getStringAgeDuration(guitar);
        if (age > 0) {
            total += age;
            count++;
        }
    }

    const averageAge = total / count;

    return averageAge
        ? `${millisecondsToFriendlyString(averageAge)}`
        : defaultString;
}

export function hasModifications(guitar: Guitar): boolean {
    return guitar.modifications
        ? guitar.modifications.length > 0
        : false;
}

export function mostModifications(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    for (const guitar of guitars) {
        if (!guitar.modifications || guitar.modifications.length < 1) {
            continue;
        }

        if (!max) {
            max = guitar;
            continue;
        }

        if ((max.modifications?.length ?? 0) < guitar.modifications.length) {
            max = guitar;
        }
    }

    return max?.modifications
        ? `${max.name} (${max.modifications.length} modifications)`
        : defaultString;
}

export function hasControls(guitar: Guitar): boolean {
    return guitar.controls
        ? guitar.controls.length > 0
        : false;
}

export function mostControls(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    for (const guitar of guitars) {
        if (!guitar.controls || guitar.controls.length < 1) {
            continue;
        }

        if (!max) {
            max = guitar;
            continue;
        }

        if ((max.controls?.length ?? 0) < guitar.controls.length) {
            max = guitar;
        }
    }

    return max?.controls
        ? `${max.name} (${max.controls.length} controls)`
        : defaultString;
}

export function mostCommonCaseStyle(guitars: ReadonlyArray<Guitar>): string {
    const cases = guitars.map(g => g.case?.caseStyle)

    return mostCommonString(cases);
}

export function mostCommonColor(guitars: ReadonlyArray<Guitar>): string {
    const colors = guitars.map(g => getColorMapping(g.color));

    return mostCommonString(colors);
}

export function mostCommonTuning(guitars: ReadonlyArray<Guitar>): string {
    const tunings = guitars.map(g => g.tuning ? g.tuning : 'Standard');

    return mostCommonString(tunings);
}

export function mostCommonScale(guitars: ReadonlyArray<Guitar>): string {
    const scales = guitars.map(g => g.scale);

    return mostCommonString(scales);
}

export function mostCommonMake(guitars: ReadonlyArray<Guitar>): string {
    const makes = guitars.filter(g => !isProject(g)).map(g => g.make);

    return mostCommonString(makes);
}

export function mostCommonStore(guitars: ReadonlyArray<Guitar>): string {
    const stores = guitars.map(g => g.purchaseStore);

    return mostCommonString(stores);
}

export function mostCommonBody(guitars: ReadonlyArray<Guitar>): string {
    const bodies = guitars.map(g => g.bodyStyle);

    return mostCommonString(bodies);
}

export function mostCommonTremoloType(guitars: ReadonlyArray<Guitar>): string {
    const tremolos = guitars.map(g => g.tremolo);

    return mostCommonString(tremolos);
}

export function mostCommonStrings(guitars: ReadonlyArray<Guitar>): string {
    const strings = guitars.map(g => g.strings?.name);

    return mostCommonString(strings);
}

export function acousticVsElectric(guitars: ReadonlyArray<Guitar>): string {
    let electric = 0;
    let acoustic = 0;
    for (const guitar of guitars) {
        if (isElectric(guitar)) {
            electric += 1;
        } else {
            acoustic += 1;
        }
    }

    return `${acoustic} vs. ${electric}`;
}

export function factoryVsProject(guitars: ReadonlyArray<Guitar>): string {
    let factory = 0;
    let project = 0;
    for (const guitar of guitars) {
        if (isProject(guitar)) {
            project += 1;
        } else {
            factory += 1;
        }
    }

    return `${factory} vs. ${project}`;
}

export function sixStringVs12string(guitars: ReadonlyArray<Guitar>): string {
    let six = 0;
    let twelve = 0;
    for (const guitar of guitars) {
        if (guitar.strings) {
            if (guitar.strings.numberOfStrings === 12) {
                twelve += 1;
            } else {
                six += 1;
            }
        }
    }

    return `${six} vs. ${twelve}`;
}

export function sunburstVsColor(guitars: ReadonlyArray<Guitar>): string {
    let sunburst = 0;
    let otherColor = 0;
    for (const guitar of guitars) {
        if (getColorMapping(guitar.color).toLocaleLowerCase().includes('sunburst')) {
            sunburst += 1;
        } else {
            otherColor += 1;
        }
    }

    return `${sunburst} vs. ${otherColor}`;
}

export function styleVsOtherStyle(style: string, guitars: ReadonlyArray<Guitar>): string {
    let styleA = 0;
    let otherStyle = 0;
    for (const guitar of guitars) {
        if (guitar.bodyStyle === style) {
            styleA += 1;
        } else {
            otherStyle += 1;
        }
    }

    return `${styleA} vs. ${otherStyle}`;
}

export function tremoloVsFixed(guitars: ReadonlyArray<Guitar>): string {
    let fixed = 0;
    let tremolo = 0;
    for (const guitar of guitars) {
        if (guitar.tremolo) {
            tremolo += 1;
        } else {
            fixed += 1;
        }
    }

    return `${tremolo} vs. ${fixed}`;
}

export function humbuckerVsSingleCoil(guitars: ReadonlyArray<Guitar>): string {
    let humbucker = 0;
    let singleCoil = 0;
    for (const guitar of guitars) {
        for (const pickup of guitar.pickups ?? []) {
            if (!pickup.type) {
                continue;
            }

            if (pickup.type.toString().toLocaleLowerCase().includes('humbucker')) {
                humbucker += 1;
            } else {
                singleCoil += 1;
            }
        }
    }

    return `${humbucker} vs. ${singleCoil}`;
}

export function flatVsArchedCase(guitars: ReadonlyArray<Guitar>): string {
    let flat = 0;
    let arched = 0;
    for (const guitar of guitars) {
        if (hasCase(guitar)) {
            if (!guitar.case?.caseStyle) {
                continue;
            }

            if (guitar.case.caseStyle === 'Flat') {
                flat += 1;
            } else if (guitar.case.caseStyle === 'Arched') {
                arched += 1;
            }
        }
    }

    return `${flat} vs. ${arched}`;
}

export function mostCommonStringGauge(guitars: ReadonlyArray<Guitar>): string {
    const strings =
        guitars
            .filter(g => g.strings?.gauge)
            .map(g => g.strings?.gauge);

    return mostCommonString(strings);
}

export function mostCommonPickupType(guitars: ReadonlyArray<Guitar>): string {
    const pickups =
        guitars.reduce((pickups, guitar) =>
            [ ...pickups, ...guitar.pickups ?? [] ],
            [] as Pickup[]);

    return mostCommonString(pickups.map(p => p.type));
}

export function mostCommonPickupSize(guitars: ReadonlyArray<Guitar>): string {
    const pickups =
        guitars.reduce((pickups, guitar) =>
            [ ...pickups, ...guitar.pickups ?? [] ],
            [] as Pickup[]);
    const sizes = pickups.filter(p => p.size).map(p => p.size);

    return mostCommonString(sizes);
}

export function mostCommonPickupNumber(guitars: ReadonlyArray<Guitar>): string {
    const pickups = guitars.map(g => g.pickups?.length.toString());

    return mostCommonString(pickups);
}

export function averagePickup(guitars: ReadonlyArray<Guitar>): string {
    const pickups =
        guitars.filter(g => g.pickups)
            .reduce((pickups, guitar) =>
                [ ...pickups, ...guitar.pickups ?? [] ],
                [] as Pickup[])
            .filter(p => p.output);

    const avgOutput =
        pickups.reduce((avg, pickup) =>
            avg + Number.parseFloat((pickup.output ?? '').split('K')[0]),
            0) / pickups.length;

    return avgOutput ? `${roundToHundredths(avgOutput)}K` : defaultString;
}

export function highestPickup(guitars: ReadonlyArray<Guitar>): string {
    let max = 0;
    let maxPickup = null;
    let maxGuitar = null;
    for (const guitar of guitars) {
        if (!hasPickups(guitar)) {
            continue;
        }

        for (const pickup of guitar.pickups ?? []) {
            if (!pickup.output) {
                continue;
            }

            const output = Number.parseFloat(pickup.output.split('K')[0]);
            if (output > max) {
                max = output;
                maxPickup = pickup;
                maxGuitar = guitar;
            }
        }
    }

    return (max > 0 && maxPickup && maxGuitar)
        ? `${maxPickup.output} - ${maxPickup.name} - ${maxPickup.position} (on ${maxGuitar.name})`
        : defaultString;
}

export function lowestPickup(guitars: ReadonlyArray<Guitar>): string {
    let min = minDefault;
    let minPickup = null;
    let minGuitar = null;

    for (const guitar of guitars) {
        if (!hasPickups(guitar)) {
            continue;
        }

        for (const pickup of guitar.pickups ?? []) {
            if (!pickup.output) {
                continue;
            }

            const output = Number.parseFloat(pickup.output.split('K')[0]);
            if (output < min) {
                min = output;
                minPickup = pickup;
                minGuitar = guitar;
            }
        }
    }

    return (min > 0 && minPickup && minGuitar)
        ? `${minPickup.output} - ${minPickup.name} - ${minPickup.position} (on ${minGuitar.name})`
        : defaultString;
}

export function oldestGuitar(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    for (const guitar of guitars) {
        if (!guitar.purchaseDate) {
            continue;
        }

        if (!max) {
            max = guitar;
            continue;
        }

        if (Date.parse(max.purchaseDate ?? Date.now().toString())
            > Date.parse(guitar.purchaseDate)) {
            max = guitar;
        }
    }

    return max
        ? `${max.name} (bought ${max.purchaseDate})`
        : defaultString;
}

export function newestGuitar(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    for (const guitar of guitars) {
        if (!guitar.purchaseDate) {
            continue;
        }

        if (!min) {
            min = guitar;
            continue;
        }

        if (Date.parse(min.purchaseDate ?? Date.now().toString())
            < Date.parse(guitar.purchaseDate)) {
            min = guitar;
        }
    }

    return min
        ? `${min.name} (bought ${min.purchaseDate})`
        : defaultString;
}

export function oldestStrings(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    let maxDate;
    for (const guitar of guitars) {
        if (!guitar.strings) {
            continue;
        }

        let lastChangeDate = guitar.strings.lastChangeDate;
        if (!lastChangeDate) {
            if (guitar.strings.name.includes('Factory')) {
                lastChangeDate = guitar.purchaseDate;
            }
            else {
                continue;
            }
        }

        if (!max) {
            max = guitar;
            maxDate = lastChangeDate;
            continue;
        }

        if (Date.parse(maxDate ?? pastDate)
                > Date.parse(lastChangeDate ?? Date.now().toString())) {
            max = guitar;
            maxDate = lastChangeDate;
        }
    }

    const duration =
        millisecondsToFriendlyString(
            Date.now() - Date.parse(maxDate ?? Date.now().toString()));

    return max
        ? maxDate === max?.purchaseDate
            ? `${max.strings?.name} strings (came with ${max.name}) - ${duration}`
            : `${max.strings?.name} strings (changed ${maxDate} on ${max.name}) - ${duration}`
        : defaultString;
}

export function newestStrings(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    let minDate;
    for (const guitar of guitars) {
        if (!guitar.strings) {
            continue;
        }

        let lastChangeDate = guitar.strings.lastChangeDate;
        if (!lastChangeDate) {
            if (guitar.strings.name.includes('Factory')) {
                lastChangeDate = guitar.purchaseDate;
            } else {
                continue;
            }
        }

        if (!min) {
            min = guitar;
            minDate = lastChangeDate;
            continue;
        }

        if (Date.parse(minDate ?? pastDate)
               < Date.parse(lastChangeDate ?? Date.now().toString())) {
            min = guitar;
            minDate = lastChangeDate;
        }
    }

    const duration =
        millisecondsToFriendlyString(
            Date.now() - Date.parse(minDate ?? Date.now().toString()));

    return min
        ? minDate === min?.purchaseDate
            ? `${min.strings?.name} strings (came with ${min.name}) - ${duration}`
            : `${min.strings?.name} strings (changed ${minDate} on ${min.name}) - ${duration}`
        : defaultString;
}

export function longestProject(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    let maxLength = 0;
    for (const guitar of guitars) {
        if (!isProject(guitar) || !guitar.projectStart) {
            continue;
        }

        const projectLength =
            Date.parse(guitar.projectComplete ?? Date.now().toString())
                - Date.parse(guitar.projectStart);

        if (!max) {
            max = guitar;
            maxLength = projectLength;
            continue;
        }

        if (maxLength < projectLength) {
            max = guitar;
            maxLength = projectLength;
        }
    }

    return max
        ? `${max.name} (started ${max.projectStart}, lasted ${millisecondsToFriendlyString(maxLength)})`
        : defaultString;
}

export function shortestProject(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    let minLength = minDefault;
    for (const guitar of guitars) {
        if (!isProject(guitar) || !guitar.projectStart) {
            continue;
        }

        const projectLength =
            Date.parse(guitar.projectComplete ?? Date.now().toString())
                - Date.parse(guitar.projectStart);

        if (!min) {
            min = guitar;
            minLength = projectLength;
            continue;
        }

        if (minLength > projectLength) {
            min = guitar;
            minLength = projectLength;
        }
    }

    return min
        ? `${min.name} (started ${min.projectStart}, lasted ${millisecondsToFriendlyString(minLength)})`
        : defaultString;
}

export function leastExpensive(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    let price = minDefault;
    for (const guitar of guitars) {
        if (isProject(guitar) || !hasPurchasePrice(guitar)) {
            continue;
        }

        const guitarCost = getGuitarCost(guitar);
        if (!min) {
            min = guitar;
            price = guitarCost;
            continue;
        }

        if (price > guitarCost) {
            min = guitar;
            price = guitarCost;
        }
    }

    return min ? `${min.name} (\$${price})` : defaultString;
}

export function leastExpensiveWithCase(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    let price = 0;
    for (const guitar of guitars) {
        if (isProject(guitar) || !hasPurchasePrice(guitar) || !hasCase(guitar)) {
            continue;
        }

        const cost = getGuitarCost(guitar)
            + (guitar.case?.purchasePrice
                ? Number.parseFloat(guitar.case.purchasePrice)
                : 0);

        if (!min) {
            min = guitar;
            price = cost;
            continue;
        }

        if (price > cost) {
            min = guitar;
            price = cost;
        }
    }

    return min ? `${min.name} (\$${price})` : defaultString;
}

export function leastExpensiveProject(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    let price = minDefault;
    for (const guitar of guitars) {
        if (!hasPurchasePrice(guitar) || !isProject(guitar)) {
            continue;
        }

        const guitarCost = getGuitarCost(guitar);
        if (!min) {
            min = guitar;
            price = guitarCost;
            continue;
        }

        if (price > guitarCost) {
            min = guitar;
            price = guitarCost;
        }
    }

    return min ? `${min.name} (\$${price})` : defaultString;
}

export function mostExpensive(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    let price = 0;
    for (const guitar of guitars) {
        if (isProject(guitar) || !hasPurchasePrice(guitar)) {
            continue;
        }

        const cost = getGuitarCost(guitar);
        if (!max) {
            max = guitar;
            price = cost;
            continue;
        }

        if (price < cost) {
            max = guitar;
            price = cost;
        }
    }

    return max ? `${max.name} (\$${price})` : defaultString;
}

export function mostExpensiveWithCase(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    let price = 0;
    for (const guitar of guitars) {
        if (isProject(guitar) || !hasPurchasePrice(guitar) || !hasCase(guitar)) {
            continue;
        }

        const cost = getGuitarCost(guitar)
            + (guitar.case?.purchasePrice
                ? Number.parseFloat(guitar.case.purchasePrice)
                : 0);

        if (!max) {
            max = guitar;
            price = cost;
            continue;
        }

        if (price < cost) {
            max = guitar;
            price = cost;
        }
    }

    return max ? `${max.name} (\$${price})` : defaultString;
}

export function mostExpensiveProject(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    let price = 0;
    for (const guitar of guitars) {
        if (!hasPurchasePrice(guitar) || !isProject(guitar)) {
            continue;
        }

        const cost = getGuitarCost(guitar);
        if (!max) {
            max = guitar;
            price = cost;
            continue;
        }

        if (price < cost) {
            max = guitar;
            price = cost;
        }
    }

    return max ? `${max.name} (\$${price})` : defaultString;
}

function getTotalCost(guitars: ReadonlyArray<Guitar>): number {
    if (guitars.length < 1) {
        return 0;
    }

    return guitars.reduce((price, guitar) =>
        price + (hasPurchasePrice(guitar) ? getGuitarCost(guitar) : 0),
        0);
}

export function getHouseholdCost(guitars: ReadonlyArray<Guitar>): string {
    const price = getTotalCost(guitars);

    return price > 0 ? `\$${roundToHundredths(price)}` : defaultString;
}

function getTotalCostWithCases(guitars: ReadonlyArray<Guitar>): number {
    if (guitars.length < 1) {
        return 0;
    }

    let price = getTotalCost(guitars);
    for (const guitar of guitars) {
        if (!hasCase(guitar) || !guitar.case?.purchasePrice) {
            continue;
        }

        price += Number.parseFloat(guitar.case.purchasePrice);
    }

    return price;
}

export function getHouseholdCostWithCases(guitars: ReadonlyArray<Guitar>): string {
    const price = getTotalCostWithCases(guitars);

    return price > 0 ? `\$${roundToHundredths(price)}` : defaultString;
}

export function averageCost(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const purchases = guitars.filter(guitar => hasPurchasePrice(guitar));
    const averagePrice =
        purchases.reduce((avg, guitar) =>
            avg + getGuitarCost(guitar),
            0) / purchases.length;

    return averagePrice
        ? `\$${roundToHundredths(averagePrice)}`
        : defaultString;
}

export function averageProjectCost(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const purchases =
        guitars.filter(guitar => isProject(guitar) && hasPurchasePrice(guitar));

    const averagePrice =
        purchases.reduce((avg, guitar) =>
            avg + getGuitarCost(guitar),
            0) / purchases.length;

    return averagePrice
        ? `\$${roundToHundredths(averagePrice)}`
        : defaultString;
}

export function mostExpensiveCase(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const cases = guitars
        .filter(guitar => hasCase(guitar))
        .map(g => g.case);

    let max;
    let price = 0;
    for (const c of cases) {
        if (!c?.purchasePrice) {
            continue;
        }

        const casePrice = Number.parseFloat(c.purchasePrice);
        if (!max) {
            max = c;
            price = casePrice;
            continue;
        }

        if (price < casePrice) {
            max = c;
            price = casePrice;
        }
    }

    return max ? `${max.name} (\$${price})` : defaultString;
}

export function leastExpensiveCase(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const cases = guitars
        .filter(guitar => hasCase(guitar))
        .map(g => g.case);

    let min;
    let minPrice = minDefault;
    for (const c of cases) {
        if (!c?.purchasePrice) {
            continue;
        }

        const casePrice = Number.parseFloat(c.purchasePrice);
        if (!min) {
            min = c;
            minPrice = casePrice;
            continue;
        }

        if (minPrice > casePrice) {
            min = c;
            minPrice = casePrice;
        }
    }

    return min ? `${min.name} (\$${minPrice})` : defaultString;
}

export function averageCaseCost(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const cases = guitars
        .filter(guitar => hasCase(guitar))
        .map(g => g.case);

    const averagePrice =
        cases.reduce((avg, c) =>
            avg + (c?.purchasePrice ? Number.parseFloat(c.purchasePrice) : 0),
            0) / cases.length;

    return averagePrice
        ? `\$${roundToHundredths(averagePrice)}`
        : defaultString;
}

export function averageCostWithCase(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const purchases = guitars.filter(guitar => hasPurchasePrice(guitar));

    const averagePrice =
        purchases.reduce((avg, g) =>
            avg
            + getGuitarCost(g)
            + ((hasCase(g) && g.case?.purchasePrice) ? Number.parseFloat(g.case.purchasePrice) : 0),
            0) / purchases.length;

    return averagePrice
        ? `\$${roundToHundredths(averagePrice)}`
        : defaultString;
}

export function mostExpensivePickup(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const pickups = guitars
        .reduce((pickups, guitar) =>
            [ ...pickups, ...guitar.pickups ?? [] ],
            [] as Pickup[])
        .filter(p => p.purchasePrice);

    let max;
    let maxPrice = 0;
    for (const pickup of pickups) {
        if (!pickup?.purchasePrice) {
            continue;
        }

        const price = Number.parseFloat(pickup.purchasePrice);
        if (!max) {
            max = pickup;
            maxPrice = price;
            continue;
        }

        if (maxPrice < price) {
            max = pickup;
            maxPrice = price;
        }
    }

    return max ? `${max.name} (\$${maxPrice})` : defaultString;
}

export function averagePickupCost(guitars: ReadonlyArray<Guitar>): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const pickups = guitars
        .reduce((pickups, guitar) =>
            [ ...pickups, ...guitar.pickups ?? [] ],
            [] as Pickup[])
        .filter(p => p.purchasePrice);

    const averagePrice =
        pickups.reduce((avg, p) =>
            avg + (p.purchasePrice ? Number.parseFloat(p.purchasePrice) : 0),
            0) / pickups.length;

    return averagePrice
        ? `\$${roundToHundredths(averagePrice)}`
        : defaultString;
}

export function randomPick(guitars: Guitar[]): Guitar {
    const day = new Date(Date.now());

    return randomElementWithSeed(guitars, day.getDate() + day.getDay());
}

export function getGuitarCost(guitar: Guitar | Project): number {
    let total = 0;
    if (!hasPurchasePrice(guitar)) {
        return total;
    }

    if (isProject(guitar)) {
        if (guitar.purchaseComponentPrice && guitar.purchaseComponentPrice.length > 0) {
            for (const item of guitar.purchaseComponentPrice) {
                total += Number.parseFloat(item);
            }
        }
    } else if (guitar.purchasePrice) {
        total += Number.parseFloat(guitar.purchasePrice);
    }

    if (getPickupCount(guitar) > 0) {
        for (const pickup of guitar.pickups ?? []) {
            if (pickup.purchasePrice) {
                total += Number.parseFloat(pickup.purchasePrice);
            }
        }
    }

    return roundToHundredths(total);
}

interface YearMap {
    [year: number]: number;
}

function guitarPerYearMap(guitars: ReadonlyArray<Guitar>): YearMap {
    if (guitars.length < 1) {
        return {};
    }

    const years: YearMap = {};
    for (const guitar of guitars) {
        if (guitar.purchaseDate) {
            const date = new Date(Date.parse(guitar.purchaseDate));
            const total = years[date.getFullYear()] ?? 0;

            years[date.getFullYear()] = 1 + total;
        }
    }

    return years;
}

function projectPerYearMap(guitars: ReadonlyArray<Guitar>): YearMap {
    if (guitars.length < 1) {
        return {};
    }

    const years: YearMap = {};
    for (const guitar of guitars) {
        if (isProject(guitar) && guitar.projectComplete) {
            const date = new Date(Date.parse(guitar.projectComplete));
            const total = years[date.getFullYear()] ?? 0;

            years[date.getFullYear()] = 1 + total;
        }
    }

    return years;
}

export function guitarsPerYear(guitars: ReadonlyArray<Guitar>): ReadonlyArray<string> {
    const years = guitarPerYearMap(guitars);

    return Object.entries(years)
        .map(([year, value]) => `${year}:\xa0${value}`);
}

export function averageGuitarPerYear(guitars: ReadonlyArray<Guitar>): string {
    const years = guitarPerYearMap(guitars);

    let total = 0;
    let length = 0;
    for (const year of Object.values(years)) {
        total += year;
        length += 1;
    }

    return Math.round(total / length).toString();
}

export function mostGuitarsInAYear(guitars: ReadonlyArray<Guitar>): string {
    const years = guitarPerYearMap(guitars);

    let maxYear = 0;
    let maxNumber = 0;
    for (const key of Object.keys(years)) {
        const year = Number.parseInt(key);
        if (years[year] > maxNumber) {
            maxNumber = years[year];
            maxYear = year;
        }
    }

    return `${maxNumber} in ${maxYear}`;
}

export function guitarsThisYear(guitars: ReadonlyArray<Guitar>): string {
    const date = new Date(Date.now());
    const years = guitarPerYearMap(guitars);

    return `${years[date.getFullYear()]} in ${date.getFullYear()}`;
}

function casePerYearMap(guitars: ReadonlyArray<Guitar>): YearMap {
    if (guitars.length < 1) {
        return {};
    }

    const years: YearMap = {};
    for (const guitar of guitars) {
        if (hasCase(guitar) && guitar.case?.purchaseDate) {
            const date = new Date(Date.parse(guitar.case.purchaseDate));
            const total = years[date.getFullYear()] ?? 0;

            years[date.getFullYear()] = 1 + total;
        }
    }

    return years;
}

export function mostCasesInAYear(guitars: ReadonlyArray<Guitar>): string {
    const years = casePerYearMap(guitars);

    let maxYear = 0;
    let maxNumber = 0;
    for (const key of Object.keys(years)) {
        const year = Number.parseInt(key);
        if (years[year] > maxNumber) {
            maxNumber = years[year];
            maxYear = year;
        }
    }

    return `${maxNumber} in ${maxYear}`;
}

export function mostProjectsInAYear(guitars: ReadonlyArray<Guitar>): string {
    const years = projectPerYearMap(guitars);

    let maxYear = 0;
    let maxNumber = 0;
    for (const key of Object.keys(years)) {
        const year = Number.parseInt(key);
        if (years[year] > maxNumber) {
            maxNumber = years[year];
            maxYear = year;
        }
    }

    return `${maxNumber} in ${maxYear}`;
}

export function summarizeHousehold(guitars: ReadonlyArray<Guitar>): string {
    return `Household has ${guitars.length} guitars...`;
}

export function summarizeGuitar(guitar: Guitar): string {
    return `${guitar.name} is a ${guitar.bodyStyle} ${isElectric(guitar) ? 'electric' : 'acoustic'} `
        + `guitar with ${summarizePickups(guitar)}, `
        + `${guitar.numberOfFrets} frets${guitar.scale ? ', ' + guitar.scale + ' scale length' : ' '}`
        + `${guitar.tremolo ? ', and tremolo' : ''}`;
}

export function summarizePickups(guitar: Guitar): string {
    const pickupCount = getPickupCount(guitar);
    if (pickupCount < 1) {
        return 'no pickups';
    }

    const types = Array<string>();
    for (const pickup of guitar.pickups ?? []) {
        if (types.includes(pickup.type)) {
            continue;
        }

        types.push(pickup.type);
    }

    return types.length > 1
        ? `${pickupCount} pickups - ${types.join(', ')}`
        : `${pickupCount} `
            + `${types.join(', ')} `
            + `${pickupCount > 1 ? 'pickups' : 'pickup'}`;
}

function getColorMapping(color: string): string {
    const mapping: { [key: string]: string; } = {
        'Shoreline Gold': 'Gold',
        'Red Stain Brown': 'Red',
        'Tobacco Burst': 'Sunburst',
        'Sunrise Orange': 'Orange',
        'Candy Apple Red': 'Red',
        'Honeyburst':'Sunburst',
        'Sonic Blue': 'Blue',
        'Butterscotch': 'Natural',
        'Sherwood Green': 'Green',
        'Mahogany': 'Natural',
        'Metallic Gold': 'Gold',
        'Vintage Natural': 'Natural',
        'Vintage Green': 'Green',
        'Powder Blue': 'Blue',
        'Metallic Teal': 'Blue',
        'Surf Green': 'Green',
        'Ice Blue Metallic': 'Blue',
        'Vintage Sunburst': 'Sunburst',
        'Cobalt Blue Metallic': 'Blue',
        'Old Army Green': 'Green',
        'Purple Haze Metalflake': 'Purple',
        'Aztec Gold Metalflake': 'Gold',
        'Olympic White': 'White',
        'TV Yellow': 'Yellow',
        'Seafoam Green': 'Green'
    };

    if (color in mapping) {
        return mapping[color];
    }

    return color;
}
