import { Guitar } from '../../interfaces/models/guitar';

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
  years.forEach(y => {
    const year = Number.parseInt(y);
    total += yearMap[year];
    yearMap[year] = total;
  });

  return yearMap;
}

export function guitarPurchasePerStore(guitars: ReadonlyArray<Guitar>): Record<string, number> {
  if (guitars.length < 1) {
    return {};
  }

  const stores: Record<string, number> = {};
  for (const guitar of guitars) {
    if (guitar.purchaseStore) {
      const total = stores[guitar.purchaseStore] ?? 0;

      stores[guitar.purchaseStore] = 1 + total;
    }
  }

  return stores;
}

export function guitarComponentPurchasePerStore(guitars: ReadonlyArray<Guitar>): Record<string, number> {
  if (guitars.length < 1) {
    return {};
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

  return stores;
}
