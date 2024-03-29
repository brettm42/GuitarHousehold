export function StringEnum<T extends string>(i: Array<T>): { [K in T]: K } {
  return i.reduce((item, key) => {
    item[key] = key;
    return item;
  }, Object.create(null));
}

export function mostCommonString(items: ReadonlyArray<string | null | undefined>, skipEmptyStrings = false): string {
  const fallbackString = 'None';
  if (items.length === 0) {
    return fallbackString;
  }

  const modeMap: { [key: string]: number; } = {};
  let maxElement = items[0];
  let maxCount = 1;

  for (let i = 0; i < items.length; i++) {
    let elem = items[i];
    if (!elem) {
      if (skipEmptyStrings) {
        continue;
      }
      
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
  const oneDay = 86400000;
  const oneWeek = 604800000;
  const oneMonth = 2419200000;
  const oneYear = 31536000000;

  if (duration < oneYear) {
    if (duration < oneMonth) {
      if (duration < oneWeek) {
        if (duration < oneDay) {
          return 'less than a day';
        }

        const time = Math.round(duration / oneDay);

        return `${time} day${time === 1 ? '' : 's'}`;
      }

      const time = Math.round(duration / oneWeek);

      return `${time} week${time === 1 ? '' : 's'}`;
    }

    const time = Math.round(duration / oneMonth);

    return `${time} month${time === 1 ? '' : 's'}`;
  }

  const time = Math.round(duration / oneYear);

  return `${time} year${time === 1 ? '' : 's'}`;
}

export function roundToHundredths(value: number): number {
  return Math.round(value * 100) / 100;
}

export function roundToHundredthsString(value: number): string {
  const rounded = roundToHundredths(value).toString();
  const decimalIdx = rounded.indexOf('.');
  
  return decimalIdx === (rounded.length - 2)
    ? `${rounded}0`
    : rounded;
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

export function formatCurrencyStringToString(value: string | undefined, locale?: string): string {
  const parsedNumber = Number.parseFloat(value || '');

  return formatCurrencyToString(parsedNumber, locale);
}

export function formatCurrencyToString(value: number, locale?: string): string {
  return new Intl.NumberFormat(
      locale ? locale : 'en-US', 
      { 
        style: 'currency', 
        currency: locale ? locale : 'USD',
        maximumFractionDigits: 2 
      })
    .format(value);
}

export function getPriceChange(currentPrice: string, purchasePrice: string): string {
  const now = Number.parseFloat(currentPrice || '0');
  const then = Number.parseFloat(purchasePrice || '0');
  const delta = then - now;

  return `${delta > 0 ? '▲' : '▼'} ${formatCurrencyToString(delta)}`;
}
