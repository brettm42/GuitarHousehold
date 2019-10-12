import { Guitar } from '../../interfaces/models/guitar';
import { Pickup } from '../../interfaces/models/pickup';
import { Project } from '../../interfaces/models/project';

import { 
    millisecondsToFriendlyString,
    randomElementWithSeed,
    roundToHundredths
} from '../../infrastructure/utils';

const defaultString = 'None';

export function isProject(guitar: any): guitar is Project {
    return guitar.projectStart !== undefined;
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

export function hasPurchasePrice(guitar: Guitar | Project): boolean {
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

export function mostPickups(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    for (let guitar of guitars) {
        if (!guitar.pickups) {
            continue;
        }

        if (!max) {
            max = guitar;
            continue;
        }

        if ((max.pickups || []).length < guitar.pickups.length) {
            max = guitar;
        }
    }

    return max 
        ? `${max.name} (${max.pickups ? max.pickups.length : 'no'} pickups)`
        : defaultString;
}

export function mostFrets(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    for (let guitar of guitars) {
        if (!guitar.numberOfFrets) {
            continue;
        }

        if (!max) {
            max = guitar;
            continue;
        }

        if ((max.numberOfFrets || 0) < guitar.numberOfFrets) {
            max = guitar;
        }
    }

    return max 
        ? `${max.name} (${max.numberOfFrets} frets)`
        : defaultString;
}

export function leastFrets(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    for (let guitar of guitars) {
        if (!guitar.numberOfFrets) {
            continue;
        }

        if (!min) {
            min = guitar;
            continue;
        }

        if ((min.numberOfFrets || 999999) > guitar.numberOfFrets) {
            min = guitar;
        }
    }

    return min 
        ? `${min.name} (${min.numberOfFrets} frets)`
        : defaultString;
}

export function averageFrets(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const items = guitars.filter(c => c.numberOfFrets);
    const averageFrets = 
        items.reduce((avg, g) => 
            avg + (g.numberOfFrets || 0),
            0) / items.length;

    return averageFrets 
        ? `${Math.round(averageFrets)}` 
        : defaultString;
}

export function hasModifications(guitar: Guitar): boolean {
    return guitar.modifications
        ? guitar.modifications.length > 0
        : false;
}

export function mostModifications(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    for (let guitar of guitars) {
        if (!guitar.modifications) {
            continue;
        }

        if (!max) {
            max = guitar;
            continue;
        }

        if ((max.modifications || []).length < guitar.modifications.length) {
            max = guitar;
        }
    }

    return max && max.modifications 
        ? `${max.name} (${max.modifications.length} modifications)`
        : defaultString;
}

export function hasControls(guitar: Guitar): boolean {
    return guitar.controls
        ? guitar.controls.length > 0
        : false;
}

export function mostControls(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    for (let guitar of guitars) {
        if (!guitar.controls) {
            continue;
        }

        if (!max) {
            max = guitar;
            continue;
        }

        if ((max.controls || []).length < guitar.controls.length) {
            max = guitar;
        }
    }

    return max && max.controls 
        ? `${max.name} (${max.controls.length} controls)`
        : defaultString;
}

export function mostCommonCaseStyle(guitars: ReadonlyArray<Guitar>): string {
    const cases = guitars.map(g => {
        if (g.case) {
            return g.case.caseStyle;
        }

        return undefined;
    });

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

export function acousticVsElectric(guitars: ReadonlyArray<Guitar>): string {
    let electric = 0;
    let acoustic = 0;
    for (let guitar of guitars) {
        if (isElectric(guitar)) {
            electric += 1;
        } else if (isAcoustic(guitar)) {
            acoustic += 1;
        }
    }

    return `${acoustic} vs. ${electric}`;
}

export function factoryVsProject(guitars: ReadonlyArray<Guitar>): string {
    let factory = 0;
    let project = 0;
    for (let guitar of guitars) {
        if (isProject(guitar)) {
            project += 1;
        } else {
            factory += 1;
        }
    }

    return `${factory} vs. ${project}`;
}

export function mostCommonPickupType(guitars: ReadonlyArray<Guitar>): string {
    const pickups = 
        guitars.reduce((pickups, guitar) => [ ...pickups, ...guitar.pickups || [] ], [] as Pickup[]);

    return mostCommonString(pickups.map(p => p.type));
}

export function mostCommonPickupNumber(guitars: ReadonlyArray<Guitar>): string {
    const pickups = guitars.map(g => (g.pickups || []).length.toString());

    return mostCommonString(pickups);
}

export function averagePickup(guitars: ReadonlyArray<Guitar>): string {
    const pickups = 
        guitars
            .filter(g => g.pickups)
            .reduce((pickups, guitar) => [ ...pickups, ...guitar.pickups || [] ], [] as Pickup[])
            .filter(p => p.output);

    const avgOutput = 
        pickups.reduce((avg, pickup) => 
            avg + Number.parseFloat((pickup.output || '').split('K')[0]), 0) / pickups.length;

    return avgOutput ? `${roundToHundredths(avgOutput)}K` : defaultString;
}

export function highestPickup(guitars: ReadonlyArray<Guitar>): string {
    let max = 0;
    let maxPickup = null;
    let maxGuitar = null;
    for (let guitar of guitars) {
        if (!guitar.pickups) {
            continue;
        }

        for (let pickup of guitar.pickups) {
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

    return max > 0 && maxPickup && maxGuitar
        ? `${maxPickup.output} - ${maxPickup.name} - ${maxPickup.position} (on ${maxGuitar.name})`
        : defaultString;
}

export function lowestPickup(guitars: ReadonlyArray<Guitar>): string {
    let min = 999999;
    let minPickup = null;
    let minGuitar = null;

    for (let guitar of guitars) {
        if (!guitar.pickups) {
            continue;
        }

        for (let pickup of guitar.pickups) {
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

    return min > 0 && minPickup && minGuitar
        ? `${minPickup.output} - ${minPickup.name} - ${minPickup.position} (on ${minGuitar.name})`
        : defaultString;
}

export function oldestGuitar(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    for (let guitar of guitars) {
        if (!guitar.purchaseDate) {
            continue;
        }

        if (!max) {
            max = guitar;
            continue;
        }

        if (Date.parse(max.purchaseDate || Date.now().toString()) 
            > Date.parse(guitar.purchaseDate)) {
            max = guitar;
        }
    }

    return max 
        ? `${max.name} (bought ${max.purchaseDate})`
        : defaultString;
}

export function newestGuitar(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    for (let guitar of guitars) {
        if (!guitar.purchaseDate) {
            continue;
        }

        if (!min) {
            min = guitar;
            continue;
        }

        if (Date.parse(min.purchaseDate || Date.now().toString()) 
            < Date.parse(guitar.purchaseDate)) {
            min = guitar;
        }
    }

    return min
        ? `${min.name} (bought ${min.purchaseDate})`
        : defaultString;
}

export function longestProject(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    let maxLength = 0;
    for (let guitar of guitars) {
        if (!isProject(guitar) || !guitar.projectStart) {
            continue;
        }

        const projectLength = 
            Date.parse(guitar.projectComplete || Date.now().toString()) 
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

export function shortestProject(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    let minLength = 99999999;
    for (let guitar of guitars) {
        if (!isProject(guitar) || !guitar.projectStart) {
            continue;
        }

        const projectLength = 
            Date.parse(guitar.projectComplete || Date.now().toString()) 
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

export function leastExpensive(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    let price;
    for (let guitar of guitars) {
        if (!hasPurchasePrice(guitar)) {
            continue;
        }
        
        const guitarCost = getGuitarCost(guitar);
        if (!min) {
            min = guitar;
            price = guitarCost;
            continue;
        }

        if ((price || 9999999) > guitarCost) {
            min = guitar;
            price = guitarCost;
        }
    }

    return min ? `${min.name} (\$${price})` : defaultString;
}

export function leastExpensiveWithCase(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    let price;
    for (let guitar of guitars) {
        if (!hasPurchasePrice(guitar) || !guitar.case) {
            continue;
        }

        const cost = getGuitarCost(guitar)
            + (guitar.case.purchasePrice ? Number.parseFloat(guitar.case.purchasePrice) : 0);

        if (!min) {
            min = guitar;
            price = cost;
            continue;
        }

        if ((price || 0) > cost) {
            min = guitar;
            price = cost;
        }
    }

    return min ? `${min.name} (\$${price})` : defaultString;
}

export function leastExpensiveProject(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let min;
    let price;
    for (let guitar of guitars) {
        if (!hasPurchasePrice(guitar) || !isProject(guitar)) {
            continue;
        }
        
        const guitarCost = getGuitarCost(guitar);
        if (!min) {
            min = guitar;
            price = guitarCost;
            continue;
        }

        if ((price || 9999999) > guitarCost) {
            min = guitar;
            price = guitarCost;
        }
    }

    return min ? `${min.name} (\$${price})` : defaultString;
}

export function mostExpensive(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    let price;
    for (let guitar of guitars) {
        if (!hasPurchasePrice(guitar)) {
            continue;
        }

        const cost = getGuitarCost(guitar);
        if (!max) {
            max = guitar;
            price = cost;
            continue;
        }

        if ((price || 0) < cost) {
            max = guitar;
            price = cost;
        }
    }

    return max ? `${max.name} (\$${price})` : defaultString;
}

export function mostExpensiveWithCase(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    let price;
    for (let guitar of guitars) {
        if (!hasPurchasePrice(guitar) || !guitar.case) {
            continue;
        }

        const cost = getGuitarCost(guitar)
            + (guitar.case.purchasePrice ? Number.parseFloat(guitar.case.purchasePrice) : 0);

        if (!max) {
            max = guitar;
            price = cost;
            continue;
        }

        if ((price || 0) < cost) {
            max = guitar;
            price = cost;
        }
    }

    return max ? `${max.name} (\$${price})` : defaultString;
}

export function mostExpensiveProject(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let max;
    let price;
    for (let guitar of guitars) {
        if (!hasPurchasePrice(guitar) || !isProject(guitar)) {
            continue;
        }

        const cost = getGuitarCost(guitar);
        if (!max) {
            max = guitar;
            price = cost;
            continue;
        }

        if ((price || 0) < cost) {
            max = guitar;
            price = cost;
        }
    }

    return max ? `${max.name} (\$${price})` : defaultString;
}

function getTotalCost(guitars: Guitar[]): number {
    if (guitars.length < 1) {
        return 0;
    }

    return guitars.reduce((price, guitar) => 
        price 
        + (hasPurchasePrice(guitar)
            ? getGuitarCost(guitar)
            : 0), 
        0);
}

export function totalCost(guitars: Guitar[]): string {
    const price = getTotalCost(guitars);

    return price || price < 1 
        ? `\$${roundToHundredths(price)}` 
        : defaultString;
}

export function totalCostWithCases(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    let price = getTotalCost(guitars);
    for (let guitar of guitars) {
        if (!guitar.case || !guitar.case.purchasePrice) {
            continue;
        }

        price += Number.parseFloat(guitar.case.purchasePrice);
    }

    return price || price < 1 ? `\$${roundToHundredths(price)}` : defaultString;
}

export function averageCost(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const purchases = guitars.filter(guitar => hasPurchasePrice(guitar));
    const averagePrice = 
        purchases.reduce((avg, guitar) => avg 
            + getGuitarCost(guitar), 
            0) / purchases.length;

    return averagePrice 
        ? `\$${roundToHundredths(averagePrice)}` 
        : defaultString;
}

export function averageProjectCost(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const purchases = 
        guitars.filter(guitar => hasPurchasePrice(guitar) && isProject(guitar));
    
    const averagePrice = 
        purchases.reduce((avg, guitar) => avg 
            + getGuitarCost(guitar), 
            0) / purchases.length;

    return averagePrice 
        ? `\$${roundToHundredths(averagePrice)}` 
        : defaultString;
}

export function averageCaseCost(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const cases = guitars.filter(c => c.case).map(g => g.case);

    const averagePrice = 
        cases.reduce((avg, c) => avg 
            + (c && c.purchasePrice ? Number.parseFloat(c.purchasePrice) : 0), 
            0) / cases.length;

    return averagePrice 
        ? `\$${roundToHundredths(averagePrice)}` 
        : defaultString;
}

export function averageCostWithCase(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const purchases = guitars.filter(guitar => hasPurchasePrice(guitar));

    const averagePrice = 
        purchases.reduce((avg, g) => avg 
            + getGuitarCost(g) 
            + (g.case && g.case.purchasePrice ? Number.parseFloat(g.case.purchasePrice) : 0), 
            0) / purchases.length;

    return averagePrice 
        ? `\$${roundToHundredths(averagePrice)}` 
        : defaultString;
}

export function averagePickupCost(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    const pickups = guitars
        .reduce((pickups, guitar) => [ ...pickups, ...guitar.pickups || [] ], [] as Pickup[])
        .filter(p => p.purchasePrice);

    const averagePrice = 
        pickups.reduce((avg, p) => avg 
            + (p && p.purchasePrice ? Number.parseFloat(p.purchasePrice) : 0), 
            0) / pickups.length;

    return averagePrice 
        ? `\$${roundToHundredths(averagePrice)}` 
        : defaultString;
}

export function randomPick(guitars: Guitar[]): Guitar {
    const day = new Date(Date.now());

    return randomElementWithSeed(guitars, day.getDate() + day.getDay());
}

function mostCommonString(items: ReadonlyArray<string | undefined>): string {
    const fallbackString = 'None';
    if (items.length === 0) {
        return fallbackString;
    }

    const modeMap: { [key: string]: number; } = {};
    let maxElement = items[0];
    let maxCount = 1;

    for (let i = 0; i < items.length; i++) {
        let elem = items[i];
        if (elem === undefined) {
            elem = fallbackString;
        }

        if (!modeMap[elem]) {
            modeMap[elem] = 1;
        } else {
            modeMap[elem]++;  
        }

        if (modeMap[elem] > maxCount) {
            maxElement = elem;
            maxCount = modeMap[elem];
        }
    }

    return maxElement || fallbackString;
}

export function getGuitarCost(guitar: Guitar | Project): number {
    let total = 0

    if (!hasPurchasePrice(guitar)) {
        return total;
    }

    if (isProject(guitar)) {
        if (guitar.purchaseComponentPrice && guitar.purchaseComponentPrice.length > 0) {
            for (let item of guitar.purchaseComponentPrice) {
                total += Number.parseFloat(item);
            }
        }
    } else if (guitar.purchasePrice) {
        total += Number.parseFloat(guitar.purchasePrice);
    }

    if (guitar.pickups && guitar.pickups.length > 0) {
        for (let pickup of guitar.pickups) {
            if (pickup.purchasePrice) {
                total += Number.parseFloat(pickup.purchasePrice);
            }
        }
    }

    return roundToHundredths(total);
}

export function summarizeGuitar(guitar: Guitar): string {
    return `${guitar.name} is a ${guitar.bodyStyle} ${isElectric(guitar) ? 'electric' : 'acoustic'} guitar with `
        + `${guitar.pickups ? guitar.pickups.length : 'no'} pickups, ${guitar.numberOfFrets} frets, ${guitar.scale} scale length `
        + `${guitar.tremolo ? 'and tremolo' : ''}`;
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
        'TV Yellow': 'Yellow'
    };
    
    if (color in mapping) {
        return mapping[color];
    }

    return color;
}

function isAcoustic(guitar: Guitar): boolean {
    const acousticStyle = [ 'Acoustic', 'Flattop', 'Hollowbody', 'Archtop' ];
    const pickupNumber = 
        guitar.pickups
            ? guitar.pickups.length
            : 0;

    return acousticStyle.includes(guitar.bodyStyle) && pickupNumber < 2;
}

function isElectric(guitar: Guitar): boolean {
    return !isAcoustic(guitar);
}
