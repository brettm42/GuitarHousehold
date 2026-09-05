import { Entry } from '../interfaces/entry';
import { getGuitarCost, isProject } from '../data/guitarservice/guitarutils';

/**
 * Creates a lightweight DTO for list pages (e.g. /guitars, /, /projects).
 * By omitting heavy fields (descriptions, full history, repairs, validation, large arrays),
 * we significantly reduce the Next.js HTML initial payload size and prevent "large-page-data" warnings.
 */
export function toListDTO<T extends Entry>(item: T): Partial<T> {
  const calculatedCost = isProject(item as any) ? getGuitarCost(item as any) : undefined;

  const {
    description,
    validation,
    additionalPictures,
    repairs,
    construction,
    parts,
    history,
    ...lightweight
  } = item as any;

  if (calculatedCost !== undefined && calculatedCost > 0 && !lightweight.purchasePrice) {
    lightweight.purchasePrice = calculatedCost.toFixed(2);
  }

  if (parts && parts.length > 0) {
    if (!lightweight.bodyStyle || !lightweight.color) {
      const body = parts.find((p: any) => (p.partType || '').toLowerCase() === 'body');
      if (body) {
        if (!lightweight.bodyStyle && body.bodyStyle) lightweight.bodyStyle = body.bodyStyle;
        if (!lightweight.color && body.color) lightweight.color = body.color;
      }
    }
    if (!lightweight.scale || !lightweight.nutWidth || !lightweight.numberOfFrets) {
      const neck = parts.find((p: any) => (p.partType || '').toLowerCase() === 'neck');
      if (neck) {
        if (!lightweight.scale && neck.scale) lightweight.scale = neck.scale;
        if (!lightweight.nutWidth && neck.nutWidth) lightweight.nutWidth = neck.nutWidth;
        if (!lightweight.numberOfFrets && neck.numberOfFrets) lightweight.numberOfFrets = neck.numberOfFrets;
      }
    }
  }

  // We must return as T or Partial<T> so it matches the expected prop shape downstream,
  // but we know at runtime those omitted fields just become undefined.
  return lightweight as Partial<T>;
}

export function toListDTOs<T extends Entry>(items: ReadonlyArray<T> | T[]): T[] {
  return items.map((item) => toListDTO(item) as T);
}
