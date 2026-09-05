import * as React from 'react';

export interface ColorSwatch {
  readonly normalizedColor: string;
  readonly rawColor?: string;
  readonly tooltip: string;
  readonly style: React.CSSProperties;
}

export const COLOR_MAPPING: Record<string, string> = {
  // Burst variants
  'Antique Burst': 'Sunburst',
  'Aged Sunburst': 'Sunburst',
  'Antigua': 'Sunburst',
  'Copperburst': 'Sunburst',
  'Honeyburst': 'Sunburst',
  'Royal Tan': 'Sunburst',
  'Sienna Sunburst': 'Sunburst',
  'Sunburst Varnish': 'Sunburst',
  'Tobacco Burst': 'Sunburst',
  'Tobacco Flat': 'Sunburst',
  'Tobacco Sunburst': 'Sunburst',
  'Vintage Sunburst': 'Sunburst',

  // Natural variants
  '1954 Butterscotch': 'Natural',
  'Aged Gloss': 'Natural',
  'Antique Natural': 'Natural',
  'Antique Varnish': 'Natural',
  'Butterscotch': 'Natural',
  'Classic': 'Natural',
  'Mahogany': 'Natural',
  'Mocha': 'Natural',
  'Varnish': 'Natural',
  'Vintage Natural': 'Natural',
  'Walnut': 'Natural',
  'Walnut Stain': 'Natural',

  // Green variants
  'British Racing Green': 'Green',
  'Emerald Green': 'Green',
  'Old Army Green': 'Green',
  'Olive Drab': 'Green',
  'Seafoam Green': 'Green',
  'Sherwood Green': 'Green',
  'Sherwood Green Metallic': 'Green',
  'Surf Green': 'Green',
  'Vintage Green': 'Green',

  // Red variants
  'Antique Cherry': 'Red',
  'Candy Apple Red': 'Red',
  'Dark Cherry': 'Red',
  'Fiesta Red': 'Red',
  'Red Stain Brown': 'Red',
  'Redburst': 'Red',
  'Rocket Red': 'Red',
  'Vintage Wine Metallic': 'Red',
  'Wild Cherry': 'Red',
  'Wild Cherry Transparent': 'Red',
  'Wineburst': 'Red',
  'Burgundy': 'Red',

  // Blue variants
  'Catalina Blue': 'Blue',
  'Cobalt Blue Metallic': 'Blue',
  'Competition Burgundy': 'Blue',
  'Daphne Blue': 'Blue',
  'Ice Blue Metallic': 'Blue',
  'Lake Placid Blue': 'Blue',
  'Malibu Blue': 'Blue',
  'Metallic Teal': 'Blue',
  'Powder Blue': 'Blue',
  'Sonic Blue': 'Blue',
  'Viper Blue': 'Blue',

  // Brown variants
  'Mystic Metallic Brown': 'Brown',
  'Dark Archaizeed': 'Brown',

  // Gold variants
  'Aztec Gold Metalflake': 'Gold',
  'Gold Sparkle': 'Gold',
  'Metallic Gold': 'Gold',
  'Satin Gold': 'Gold',
  'Shoreline Gold': 'Gold',

  // Silver variants
  'Silver Sparkle': 'Silver',
  'Silverburst': 'Silver',

  // Orange variants
  'Sunrise Orange': 'Orange',

  // Purple variants
  'Purple Haze Metalflake': 'Purple',

  // White variants
  'Olympic White': 'White',

  // Yellow variants
  'TV Yellow': 'Yellow',
  'California Coral': 'Yellow',

  // Pink variants
  'Rose Gold Metallic': 'Pink',
  'Shell Pink': 'Pink',
  'Tahitian Coral': 'Pink',

  // Grey variants
  'Charcoal': 'Grey',
  'Charcoal Frost Metallic': 'Grey',
  'Gunmetal': 'Grey',
};

const SWATCH_STYLES: Record<string, React.CSSProperties> = {
  'Sunburst': {
    background: 'radial-gradient(circle at 35% 35%, #fde047 0%, #ca8a04 35%, #78350f 70%, #1c0d02 100%)',
    borderColor: '#78350f',
  },
  'Natural': {
    background: 'linear-gradient(135deg, #f5d0a9 0%, #d4a373 50%, #bc8a5f 100%)',
    borderColor: '#b08958',
  },
  'Black': {
    backgroundColor: '#18181b',
    borderColor: '#3f3f46',
  },
  'White': {
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
  },
  'Red': {
    backgroundColor: '#dc2626',
    borderColor: '#991b1b',
  },
  'Blue': {
    backgroundColor: '#2563eb',
    borderColor: '#1e40af',
  },
  'Green': {
    backgroundColor: '#16a34a',
    borderColor: '#166534',
  },
  'Yellow': {
    backgroundColor: '#eab308',
    borderColor: '#a16207',
  },
  'Gold': {
    background: 'linear-gradient(135deg, #fef08a 0%, #eab308 50%, #ca8a04 100%)',
    borderColor: '#a16207',
  },
  'Silver': {
    background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 50%, #94a3b8 100%)',
    borderColor: '#64748b',
  },
  'Orange': {
    backgroundColor: '#ea580c',
    borderColor: '#9a3412',
  },
  'Purple': {
    backgroundColor: '#9333ea',
    borderColor: '#6b21a8',
  },
  'Pink': {
    backgroundColor: '#ec4899',
    borderColor: '#be185d',
  },
  'Brown': {
    backgroundColor: '#78350f',
    borderColor: '#451a03',
  },
  'Grey': {
    backgroundColor: '#64748b',
    borderColor: '#334155',
  },
  'Unfinished': {
    backgroundColor: '#f1f5f9',
    borderColor: '#94a3b8',
    borderStyle: 'dashed',
  },
  'Unknown': {
    backgroundColor: '#e2e8f0',
    borderColor: '#cbd5e1',
  },
};

export function getColorMapping(color?: string): string {
  if (!color || !color.trim()) {
    return 'Unknown';
  }

  const trimmed = color.trim();
  if (COLOR_MAPPING[trimmed]) {
    return COLOR_MAPPING[trimmed];
  }

  const lower = trimmed.toLowerCase();
  if (lower.includes('redburst') || lower.includes('wineburst')) return 'Red';
  if (lower.includes('silverburst')) return 'Silver';
  if (lower.includes('burst')) return 'Sunburst';
  if (lower.includes('green')) return 'Green';
  if (lower.includes('blue') || lower.includes('teal')) return 'Blue';
  if (lower.includes('red') || lower.includes('cherry') || lower.includes('burgundy')) return 'Red';
  if (lower.includes('yellow')) return 'Yellow';
  if (lower.includes('gold')) return 'Gold';
  if (lower.includes('silver')) return 'Silver';
  if (lower.includes('orange')) return 'Orange';
  if (lower.includes('purple')) return 'Purple';
  if (lower.includes('pink') || lower.includes('coral')) return 'Pink';
  if (lower.includes('black')) return 'Black';
  if (lower.includes('white')) return 'White';
  if (lower.includes('brown')) return 'Brown';
  if (
    lower.includes('grey') ||
    lower.includes('gray') ||
    lower.includes('charcoal') ||
    lower.includes('gunmetal')
  ) {
    return 'Grey';
  }
  if (
    lower.includes('natural') ||
    lower.includes('butterscotch') ||
    lower.includes('walnut') ||
    lower.includes('mahogany') ||
    lower.includes('varnish')
  ) {
    return 'Natural';
  }

  return trimmed;
}

export function getColorSwatch(rawColor?: string): ColorSwatch {
  const normalized = getColorMapping(rawColor);
  const trimmedRaw = rawColor?.trim();

  let tooltip = `Color: ${normalized}`;
  if (trimmedRaw && trimmedRaw.toLowerCase() !== normalized.toLowerCase()) {
    tooltip = `Color: ${normalized} (${trimmedRaw})`;
  }

  const lowerRaw = (trimmedRaw || '').toLowerCase();
  if (lowerRaw.includes('silverburst')) {
    return {
      normalizedColor: normalized,
      rawColor: trimmedRaw,
      tooltip,
      style: {
        background: 'radial-gradient(circle at 35% 35%, #f1f5f9 0%, #94a3b8 40%, #334155 75%, #0f172a 100%)',
        borderColor: '#475569',
      },
    };
  }

  const baseStyle = SWATCH_STYLES[normalized] ?? {
    backgroundColor:
      normalized.startsWith('#') || normalized.startsWith('rgb') ? normalized : '#94a3b8',
    borderColor: '#64748b',
  };

  return {
    normalizedColor: normalized,
    rawColor: trimmedRaw,
    tooltip,
    style: baseStyle,
  };
}

export const getInstrumentColorSwatch = getColorSwatch;

