import { Entry } from '../interfaces/entry';


/**
 * Creates a lightweight DTO for list pages (e.g. /guitars, /, /projects).
 * By omitting heavy fields (descriptions, full history, repairs, validation, large arrays),
 * we significantly reduce the Next.js HTML initial payload size and prevent "large-page-data" warnings.
 */
export function toListDTO<T extends Entry>(item: T): Partial<T> {
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

  // We must return as T or Partial<T> so it matches the expected prop shape downstream,
  // but we know at runtime those omitted fields just become undefined.
  return lightweight as Partial<T>;
}

export function toListDTOs<T extends Entry>(items: ReadonlyArray<T> | T[]): T[] {
  return items.map((item) => toListDTO(item) as T);
}
