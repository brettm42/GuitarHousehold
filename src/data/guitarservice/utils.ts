
import { Guitar } from '../../interfaces/models/guitar';
import { Pickup } from '../../interfaces/models/pickup';
import { Project } from '../../interfaces/models/project';

import { millisecondsToFriendlyString } from '../../infrastructure/utils';

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

export function mostPickups(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    var max;
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
        ? `${max.name} (${max.pickups.length} pickups)`
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

    var max;
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

export function mostCommonColor(guitars: ReadonlyArray<Guitar>): string {
    const colors = guitars.map(g => getColorMapping(g.color));

    return mostCommonString(colors);
}

export function mostCommonTuning(guitars: ReadonlyArray<Guitar>): string {
    const tunings = guitars.map(g => g.tuning);

    return mostCommonString(tunings);
}

export function mostCommonScale(guitars: ReadonlyArray<Guitar>): string {
    const scales = guitars.map(g => g.scale);

    return mostCommonString(scales);
}

export function mostCommonMake(guitars: ReadonlyArray<Guitar>): string {
    const makes = guitars.map(g => g.make);

    return mostCommonString(makes);
}

export function mostCommonStore(guitars: ReadonlyArray<Guitar>): string {
    const makes = guitars.map(g => g.purchaseStore);

    return mostCommonString(makes);
}

export function mostCommonBody(guitars: ReadonlyArray<Guitar>): string {
    const bodies = guitars.map(g => g.bodyStyle);

    return mostCommonString(bodies);
}

export function mostCommonPickupType(guitars: ReadonlyArray<Guitar>): string {
    const pickups = guitars.reduce((pickups, guitar) => [ ...pickups, ...guitar.pickups ], [] as Pickup[]);

    return mostCommonString(pickups.map(p => p.type));
}

export function mostCommonPickupNumber(guitars: ReadonlyArray<Guitar>): string {
    const pickups = guitars.map(g => g.pickups.length.toString());

    return mostCommonString(pickups);
}

export function oldestGuitar(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    var max;
    for (let guitar of guitars) {
        if (!guitar.purchaseDate) {
            continue;
        }

        if (!max) {
            max = guitar;
            continue;
        }

        if (Date.parse(max.purchaseDate || Date.now().toString()) > Date.parse(guitar.purchaseDate)) {
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

    var min;
    for (let guitar of guitars) {
        if (!guitar.purchaseDate) {
            continue;
        }

        if (!min) {
            min = guitar;
            continue;
        }

        if (Date.parse(min.purchaseDate || Date.now().toString()) < Date.parse(guitar.purchaseDate)) {
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

    var max;
    var maxLength = 0;
    for (let guitar of guitars) {
        if (!isProject(guitar) || !guitar.projectStart) {
            continue;
        }

        if (!max) {
            max = guitar;
            maxLength = 
                Date.parse(guitar.projectComplete || Date.now().toString()) 
                - Date.parse(guitar.projectStart);
            continue;
        }

        var projectLength = 
            Date.parse(guitar.projectComplete || Date.now().toString()) 
            - Date.parse(guitar.projectStart);
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

    var min;
    var minLength = 99999999;
    for (let guitar of guitars) {
        if (!isProject(guitar) || !guitar.projectStart) {
            continue;
        }

        if (!min) {
            min = guitar;
            minLength = 
                Date.parse(guitar.projectComplete || Date.now().toString()) 
                - Date.parse(guitar.projectStart);
            continue;
        }

        var projectLength = 
            Date.parse(guitar.projectComplete || Date.now().toString()) 
            - Date.parse(guitar.projectStart);
        if (minLength > projectLength) {
            min = guitar;
            minLength = projectLength;
        }
    }

    return min 
        ? `${min.name} (started ${min.projectStart}, lasted ${millisecondsToFriendlyString(minLength)})`
        : defaultString;
}

export function cheapest(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    var min;
    var price;
    for (let guitar of guitars) {
        if (!guitar.purchasePrice) {
            continue;
        }

        if (!min) {
            min = guitar;
            price = Number.parseFloat(guitar.purchasePrice);
            continue;
        }

        if ((price || 9999999) > Number.parseFloat(guitar.purchasePrice)) {
            min = guitar;
            price = Number.parseFloat(guitar.purchasePrice);
        }
    }

    return min ? `${min.name} (\$${price})` : defaultString;
}

export function cheapestWithCase(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    var min;
    var price;
    for (let guitar of guitars) {
        if (!guitar.purchasePrice || !guitar.case) {
            continue;
        }

        var cost = 
            Number.parseFloat(guitar.purchasePrice)
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

export function mostExpensive(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    var max;
    var price;
    for (let guitar of guitars) {
        if (!guitar.purchasePrice) {
            continue;
        }

        if (!max) {
            max = guitar;
            price = Number.parseFloat(guitar.purchasePrice);
            continue;
        }

        if ((price || 0) < Number.parseFloat(guitar.purchasePrice)) {
            max = guitar;
            price = Number.parseFloat(guitar.purchasePrice);
        }
    }

    return max ? `${max.name} (\$${price})` : defaultString;
}

export function mostExpensiveWithCase(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    var max;
    var price;
    for (let guitar of guitars) {
        if (!guitar.purchasePrice || !guitar.case) {
            continue;
        }

        var cost = 
            Number.parseFloat(guitar.purchasePrice)
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

export function totalCost(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    var price = 0;
    for (let guitar of guitars) {
        if (!guitar.purchasePrice) {
            continue;
        }

        price += Number.parseFloat(guitar.purchasePrice);
    }

    return price ? `\$${Math.round(price * 100) / 100}` : defaultString;
}

export function totalCostWithCases(guitars: Guitar[]): string {
    if (guitars.length < 1) {
        return defaultString;
    }

    var price = 0;
    for (let guitar of guitars) {
        if (!guitar.purchasePrice) {
            continue;
        }

        price += Number.parseFloat(guitar.purchasePrice);

        if (!guitar.case || !guitar.case.purchasePrice) {
            continue;
        }

        price += Number.parseFloat(guitar.case.purchasePrice);
    }

    return price ? `\$${Math.round(price * 100) / 100}` : defaultString;
}

function mostCommonString(items: ReadonlyArray<string | undefined>): string {
    if (items.length === 0) {
        return "None";
    }

    var modeMap: { [key: string]: number; } = {};
    let maxElement = items[0];
    let maxCount = 1;

    for (var i = 0; i < items.length; i++) {
        var elem = items[i];
        if (elem === undefined) {
            continue;
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

    return maxElement || "Standard";
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
        'Olympic White': 'White' 
    };
    
    if (color in mapping) {
        return mapping[color];
    }

    return color;
}