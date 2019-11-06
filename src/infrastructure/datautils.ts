export function StringEnum<T extends string>(i: Array<T>): {[K in T]: K} {
    return i.reduce((item, key) => {
        item[key] = key;
        return item;
    }, Object.create(null));
}

export function mostCommonString(items: ReadonlyArray<string | undefined>): string {
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
    
    return maxElement ?? fallbackString;
}

export function millisecondsToFriendlyString(duration: number): string {
    const oneDay =   86400000;
    const oneWeek =  604800000;
    const oneMonth = 2419200000;
    const oneYear =  31536000000;

    if (duration < oneYear) {
        if (duration < oneMonth) {
            if (duration < oneWeek) {
                if (duration < oneDay) {
                    return 'Less than a day';
                }

                return `${Math.round(duration / oneDay)} days`;
            }

            return `${Math.round(duration / oneWeek)} weeks`;
        }

        return `${Math.round(duration / oneMonth)} months`;
    }

    return `${Math.round(duration / oneYear)} years`;
}

export function roundToHundredths(value: number): number {
    return Math.round(value * 100) / 100;
}

export function randomElement(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
}

export function randomElementWithSeed(array: any[], seed: number): any {
    return array[Math.floor(random(seed) * array.length)];
}

function random(seed: number): number {
    const i = Math.sin(seed++) * 10000;
    return i - Math.floor(i);
}
