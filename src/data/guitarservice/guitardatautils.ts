import { Guitar } from '../../interfaces/models/guitar';
import { GuitarResolver } from '../../domain/resolvers';
import * as GuitarUtils from './guitarutils';

export function guitarPurchasePerYear(guitars: ReadonlyArray<Guitar>): Record<number, number> {
  if (guitars.length < 1) {
    return {};
  }

  const years: Record<number, number> = {};
  for (const guitar of guitars) {
    if (GuitarUtils.isProject(guitar) && guitar.projectComplete) {
      const date = new Date(Date.parse(guitar.projectComplete));
      const total = years[date.getFullYear()] ?? 0;

      years[date.getFullYear()] = 1 + total;
    } else if (guitar.purchaseDate) {
      const date = new Date(Date.parse(guitar.purchaseDate));
      const total = years[date.getFullYear()] ?? 0;

      years[date.getFullYear()] = 1 + total;
    }
  }

  return years;
}

export function guitarTotalPerYear(guitars: ReadonlyArray<Guitar>): Record<number, number> {
  const yearMap = guitarPurchasePerYear(guitars);
  const years = Object.keys(yearMap);

  let total = 0;
  years.forEach((y) => {
    const year = Number.parseInt(y);
    total += yearMap[year];
    yearMap[year] = total;
  });

  return yearMap;
}

export function guitarPurchasePerStore(
  guitars: ReadonlyArray<Guitar>,
  minimumCount: number = 0
): ReadonlyArray<[string, number]> {
  if (guitars.length < 1) {
    return [];
  }

  const stores: Record<string, number> = {};
  for (const guitar of guitars) {
    if (guitar.purchaseStore) {
      const total = stores[guitar.purchaseStore] ?? 0;
      stores[guitar.purchaseStore] = 1 + total;
    }
  }

  return Object.entries(stores)
    .filter((i) => i[1] > minimumCount)
    .sort((a, b) => b[1] - a[1]);
}

export function guitarComponentPurchasePerStore(
  guitars: ReadonlyArray<Guitar>,
  minimumCount: number = 0
): ReadonlyArray<[string, number]> {
  if (guitars.length < 1) {
    return [];
  }

  const stores: Record<string, number> = {};
  for (const guitar of guitars) {
    if (guitar.purchaseStore) {
      const total = stores[guitar.purchaseStore] ?? 0;
      stores[guitar.purchaseStore] = 1 + total;
    }

    if (GuitarUtils.hasPickups(guitar)) {
      for (const pickup of guitar?.pickups ?? []) {
        if (pickup.purchaseStore) {
          const total = stores[pickup.purchaseStore] ?? 0;
          stores[pickup.purchaseStore] = 1 + total;
        }
      }
    }

    if (GuitarUtils.hasCase(guitar)) {
      if (guitar.case?.purchaseStore) {
        const total = stores[guitar.case.purchaseStore] ?? 0;
        stores[guitar.case.purchaseStore] = 1 + total;
      }
    }

    if (GuitarUtils.hasStrings(guitar)) {
      if (guitar.strings?.purchaseStore) {
        const total = stores[guitar.strings.purchaseStore] ?? 0;
        stores[guitar.strings.purchaseStore] = 1 + total;
      }
    }
  }

  return Object.entries(stores)
    .filter((i) => i[1] > minimumCount)
    .sort((a, b) => b[1] - a[1]);
}

export function guitarColorData(
  guitars: ReadonlyArray<Guitar>,
  minimumCount: number = 0
): ReadonlyArray<[string, number]> {
  if (guitars.length < 1) {
    return [];
  }

  const colors: Record<string, number> = {};
  for (const guitar of guitars) {
    const color = GuitarResolver.color(guitar);
    if (color) {
      const total = colors[GuitarUtils.getColorMapping(color)] ?? 0;
      colors[GuitarUtils.getColorMapping(color)] = 1 + total;
    }
  }

  return Object.entries(colors)
    .filter((i) => i[1] > minimumCount)
    .sort((a, b) => b[1] - a[1]);
}

export function guitarMakeData(
  guitars: ReadonlyArray<Guitar>,
  minimumCount: number = 0
): ReadonlyArray<[string, number]> {
  if (guitars.length < 1) {
    return [];
  }

  const makes: Record<string, number> = {};
  for (const guitar of guitars) {
    if (guitar.make && !GuitarUtils.isProject(guitar)) {
      const total = makes[guitar.make] ?? 0;
      makes[guitar.make] = 1 + total;
    }
  }

  return Object.entries(makes)
    .filter((i) => i[1] > minimumCount)
    .sort((a, b) => b[1] - a[1]);
}

export function guitarPriceData(guitars: ReadonlyArray<Guitar>): Record<string, number> {
  if (guitars.length < 1) {
    return {};
  }

  const sortedGuitars = [...guitars].sort(
    (a, b) => GuitarUtils.getGuitarAgeDuration(b) - GuitarUtils.getGuitarAgeDuration(a)
  );

  const prices: Record<string, number> = {};
  for (const guitar of sortedGuitars) {
    prices[guitar.name] = GuitarUtils.getGuitarCost(guitar);
  }

  return prices;
}

export function guitarStringAgeData(
  guitars: ReadonlyArray<Guitar>
): ReadonlyArray<[string, number, string]> {
  if (guitars.length < 1) {
    return [];
  }

  const results: [string, number, string][] = [];
  const now = Date.now();

  for (const guitar of guitars) {
    if (!GuitarUtils.hasStrings(guitar) || !GuitarUtils.isDelivered(guitar)) {
      continue;
    }

    let lastChangeDate = guitar.strings?.lastChangeDate;
    if (!lastChangeDate && GuitarUtils.hasFactoryStrings(guitar)) {
      lastChangeDate = guitar.purchaseDate;
    }

    if (lastChangeDate) {
      const time = Date.parse(lastChangeDate);
      if (!isNaN(time)) {
        const days = Math.max(0, Math.floor((now - time) / (1000 * 60 * 60 * 24)));
        const months = Math.round((days / 30.44) * 10) / 10;
        const stringInfo = guitar.strings?.name || guitar.strings?.gauge || 'Strings';
        results.push([guitar.name, months, `${stringInfo} (${days} days)`]);
      }
    }
  }

  return results.sort((a, b) => b[1] - a[1]);
}

export function guitarBodyStyleData(
  guitars: ReadonlyArray<Guitar>,
  minimumCount: number = 0
): ReadonlyArray<[string, number]> {
  if (guitars.length < 1) {
    return [];
  }

  const bodies: Record<string, number> = {};
  for (const guitar of guitars) {
    const bodyStyle = GuitarResolver.bodyStyle(guitar);
    if (bodyStyle) {
      const total = bodies[bodyStyle] ?? 0;
      bodies[bodyStyle] = 1 + total;
    }
  }

  return Object.entries(bodies)
    .filter((i) => i[1] > minimumCount)
    .sort((a, b) => b[1] - a[1]);
}

export function guitarScaleData(
  guitars: ReadonlyArray<Guitar>,
  minimumCount: number = 0
): ReadonlyArray<[string, number]> {
  if (guitars.length < 1) {
    return [];
  }

  const scales: Record<string, number> = {};
  for (const guitar of guitars) {
    const scale = GuitarResolver.scale(guitar);
    if (scale) {
      const total = scales[scale] ?? 0;
      scales[scale] = 1 + total;
    }
  }

  return Object.entries(scales)
    .filter((i) => i[1] > minimumCount)
    .sort((a, b) => b[1] - a[1]);
}

export function guitarManufactureDecadeData(
  guitars: ReadonlyArray<Guitar>
): ReadonlyArray<[string, number]> {
  if (guitars.length < 1) {
    return [];
  }

  const decades: Record<string, number> = {};

  for (const guitar of guitars) {
    if (guitar.manufactureYear && guitar.manufactureYear > 1900) {
      const decadeNum = Math.floor(guitar.manufactureYear / 10) * 10;
      const decadeLabel = `${decadeNum}s`;
      decades[decadeLabel] = (decades[decadeLabel] || 0) + 1;
    }
  }

  return Object.entries(decades).sort((a, b) => {
    const numA = parseInt(a[0]);
    const numB = parseInt(b[0]);
    return numA - numB;
  });
}

export function guitarProjectDurationData(
  guitars: ReadonlyArray<Guitar>
): ReadonlyArray<{ name: string; days: number; months: number; isComplete: boolean; details: string }> {
  const projects = guitars.filter((g) => GuitarUtils.isProject(g) && (g as any).projectStart);
  if (projects.length < 1) {
    return [];
  }

  const now = Date.now();
  const results = [];

  for (const project of projects as any[]) {
    const startTime = Date.parse(project.projectStart);
    if (isNaN(startTime)) continue;

    const isComplete = !!project.projectComplete;
    const endTime = isComplete ? Date.parse(project.projectComplete) : now;
    if (isNaN(endTime)) continue;

    const days = Math.max(1, Math.floor((endTime - startTime) / (1000 * 60 * 60 * 24)));
    const months = Math.round((days / 30.44) * 10) / 10;

    results.push({
      name: project.name,
      days,
      months,
      isComplete,
      details: isComplete
        ? `Completed in ${days} days (${months} mo)`
        : `In Progress for ${days} days (${months} mo)`,
    });
  }

  return results.sort((a, b) => b.days - a.days);
}
