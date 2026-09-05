import { Guitar } from '../interfaces/models/guitar';
import { Project } from '../interfaces/models/project';
import { Part } from '../interfaces/models/part';
import { Case } from '../interfaces/models/case';
import { Pickup } from '../interfaces/models/pickup';
import { Strings } from '../interfaces/models/strings';
import { BodyStyle, TremoloType } from '../interfaces/models/components';
import { resolveImageArray } from '../infrastructure/imageutils';

/**
 * Domain resolver for Guitar and Project specifications.
 * Provides functional resolution of model fields, prioritizing explicit root properties
 * and falling back cleanly to composed Part items when absent.
 */
export const GuitarResolver = {
  /** Retrieves the body part from parts if present */
  getBodyPart(guitar: Guitar | Project): Part | undefined {
    return guitar?.parts?.find((p) => (p.partType || '').toLowerCase() === 'body');
  },

  /** Retrieves the neck part from parts if present */
  getNeckPart(guitar: Guitar | Project): Part | undefined {
    return guitar?.parts?.find((p) => (p.partType || '').toLowerCase() === 'neck');
  },

  /** Retrieves the pickguard part from parts if present */
  getPickguardPart(guitar: Guitar | Project): Part | undefined {
    return guitar?.parts?.find(
      (p) =>
        (p.name || '').toLowerCase().includes('pickguard') ||
        (p.description || '').toLowerCase().includes('pickguard')
    );
  },

  /** Resolves the case, checking explicit case object then parts */
  getCase(guitar: Guitar | Project): Case | Part | undefined {
    if (guitar?.case && guitar.case.id !== undefined) {
      return guitar.case;
    }
    return guitar?.parts?.find((p) => (p.partType || '').toLowerCase() === 'case');
  },

  /** Resolves pickups, checking explicit pickups array then parts */
  getPickups(guitar: Guitar | Project): ReadonlyArray<Pickup | Part> {
    if (guitar?.pickups && guitar.pickups.length > 0) {
      return guitar.pickups;
    }
    if (guitar?.parts) {
      return guitar.parts.filter((p) => (p.partType || '').toLowerCase() === 'pickup');
    }
    return [];
  },

  /** Resolves strings, checking explicit strings object then parts */
  getStrings(guitar: Guitar | Project): Strings | Part | undefined {
    if (guitar?.strings && guitar.strings.id !== undefined) {
      return guitar.strings;
    }
    return guitar?.parts?.find((p) => (p.partType || '').toLowerCase() === 'strings');
  },

  /** Resolves BodyStyle from root or Body part */
  bodyStyle(guitar: Guitar | Project): BodyStyle | undefined {
    if (guitar?.bodyStyle) return guitar.bodyStyle;
    return this.getBodyPart(guitar)?.bodyStyle;
  },

  /** Resolves finish color from root or Body part */
  color(guitar: Guitar | Project): string | undefined {
    if (guitar?.color) return guitar.color;
    return this.getBodyPart(guitar)?.color;
  },

  /** Resolves tremolo type from root or Body/Hardware part */
  tremolo(guitar: Guitar | Project): TremoloType | undefined {
    if (guitar?.tremolo) return guitar.tremolo;
    const bodyTrem = this.getBodyPart(guitar)?.tremolo;
    if (bodyTrem) return bodyTrem;
    const hwTrem = guitar?.parts?.find((p) =>
      (p.name || '').toLowerCase().includes('tremolo')
    )?.tremolo;
    return hwTrem;
  },

  /** Resolves scale length from root or Neck part */
  scale(guitar: Guitar | Project): string | undefined {
    if (guitar?.scale) return guitar.scale;
    return this.getNeckPart(guitar)?.scale;
  },

  /** Resolves number of frets from root or Neck part */
  numberOfFrets(guitar: Guitar | Project): number | undefined {
    if (guitar?.numberOfFrets !== undefined) return guitar.numberOfFrets;
    return this.getNeckPart(guitar)?.numberOfFrets;
  },

  /** Resolves neck radius from root or Neck part */
  neckRadius(guitar: Guitar | Project): string | undefined {
    if (guitar?.neckRadius) return guitar.neckRadius;
    return this.getNeckPart(guitar)?.neckRadius;
  },

  /** Resolves nut width from root or Neck part */
  nutWidth(guitar: Guitar | Project): string | undefined {
    if (guitar?.nutWidth) return guitar.nutWidth;
    return this.getNeckPart(guitar)?.nutWidth;
  },

  /** Resolves bolt-on vs set neck construction from root or Body part */
  neckBoltOn(guitar: Guitar | Project): boolean | undefined {
    if (guitar?.neckBoltOn !== undefined) return guitar.neckBoltOn;
    return this.getBodyPart(guitar)?.neckBoltOn;
  },

  /** Resolves body wood material from construction or Body part */
  bodyMaterial(guitar: Guitar | Project): string | undefined {
    if (guitar?.construction?.bodyMaterial) return guitar.construction.bodyMaterial;
    return this.getBodyPart(guitar)?.bodyMaterial;
  },

  /** Resolves top wood material from construction or Body part */
  topMaterial(guitar: Guitar | Project): string | undefined {
    if (guitar?.construction?.topMaterial) return guitar.construction.topMaterial;
    return this.getBodyPart(guitar)?.topMaterial;
  },

  /** Resolves neck wood material from construction or Neck part */
  neckMaterial(guitar: Guitar | Project): string | undefined {
    if (guitar?.construction?.neckMaterial) return guitar.construction.neckMaterial;
    return this.getNeckPart(guitar)?.neckMaterial;
  },

  /** Resolves fingerboard wood material from construction or Neck part */
  fingerboardMaterial(guitar: Guitar | Project): string | undefined {
    if (guitar?.construction?.fingerboardMaterial) return guitar.construction.fingerboardMaterial;
    return this.getNeckPart(guitar)?.fingerboardMaterial;
  },

  /** Resolves descriptive body label */
  bodyDescription(guitar: Guitar | Project): string | undefined {
    if ((guitar as Project)?.body) return (guitar as Project).body;
    const body = this.getBodyPart(guitar);
    if (!body) return undefined;
    return `${body.name}${body.purchaseStore ? ` (from ${body.purchaseStore})` : ''}`;
  },

  /** Resolves descriptive neck label */
  neckDescription(guitar: Guitar | Project): string | undefined {
    if ((guitar as Project)?.neck) return (guitar as Project).neck;
    const neck = this.getNeckPart(guitar);
    if (!neck) return undefined;
    return `${neck.name}${neck.purchaseStore ? ` (from ${neck.purchaseStore})` : ''}`;
  },

  /** Resolves descriptive pickguard label */
  pickguardDescription(guitar: Guitar | Project): string | undefined {
    if ((guitar as Project)?.pickguard) return (guitar as Project).pickguard;
    return this.getPickguardPart(guitar)?.name;
  }
};

/**
 * Domain resolver for Part-specific queries and media.
 */
export const PartResolver = {
  /** Resolves all images associated with a part into static asset paths */
  getPictures(part: Part, defaultFolder = '/images/parts'): string[] {
    const list: string[] = [];
    if (part.picture) list.push(part.picture);
    if (part.pictures) list.push(...part.pictures);
    if (part.additionalPictures) list.push(...part.additionalPictures);
    return resolveImageArray(list, defaultFolder);
  },

  /** Indicates if a part has recorded modifications */
  hasModifications(part: Part): boolean {
    return Boolean(part.modifications && part.modifications.length > 0);
  }
};

