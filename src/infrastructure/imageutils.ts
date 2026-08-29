/**
 * Utility functions for resolving local and remote image paths seamlessly.
 */

/**
 * Resolves a given image source into a valid URL or local static asset path.
 *
 * Examples:
 * - "https://lh3.googleusercontent.com/..." -> "https://lh3.googleusercontent.com/..."
 * - "/images/guitars/100.jpg"              -> "/images/guitars/100.jpg"
 * - "100.jpg"                              -> "/images/guitars/100.jpg"
 * - "custom/pic.png"                       -> "/images/guitars/custom/pic.png"
 * - undefined / null / ""                  -> undefined
 */
export function resolveImageUrl(
  src?: string | null,
  defaultFolder = '/images/guitars'
): string | undefined {
  if (!src) {
    return undefined;
  }

  const trimmed = src.trim();
  if (!trimmed) {
    return undefined;
  }

  // Remote URL or Data URI
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // Already an absolute public path (e.g. /images/... or /guitar.ico)
  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  // Relative filename or subpath, prepend defaultFolder
  const cleanFolder = defaultFolder.endsWith('/')
    ? defaultFolder.slice(0, -1)
    : defaultFolder;

  return `${cleanFolder}/${trimmed}`;
}

/**
 * Resolves an array of image paths/URLs, filtering out undefined/empty entries.
 */
export function resolveImageArray(
  images?: ReadonlyArray<string | undefined | null>,
  defaultFolder = '/images/guitars'
): string[] {
  if (!images || images.length === 0) {
    return [];
  }

  const resolved = images
    .map((img) => resolveImageUrl(img, defaultFolder))
    .filter((url): url is string => Boolean(url));

  return Array.from(new Set(resolved));
}

/**
 * Resolves a guitar's main picture, supporting explicit pictures, additionalPictures fallback, or ID-based conventions.
 */
export function getGuitarPictureUrl(guitar?: {
  picture?: string;
  additionalPictures?: ReadonlyArray<string>;
  id?: number | string;
}): string | undefined {
  if (!guitar) {
    return undefined;
  }

  if (guitar.picture && guitar.picture.trim()) {
    return resolveImageUrl(guitar.picture, '/images/guitars');
  }

  if (guitar.additionalPictures && guitar.additionalPictures.length > 0) {
    const first = guitar.additionalPictures.find((img) => Boolean(img && img.trim()));
    if (first) {
      return resolveImageUrl(first, '/images/guitars');
    }
  }

  return undefined;
}

