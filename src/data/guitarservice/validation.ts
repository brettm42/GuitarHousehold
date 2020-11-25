import { ValidationFlag } from '../../infrastructure/shared';

import { Case } from '../../interfaces/models/case';
import { Guitar } from '../../interfaces/models/guitar';
import { Pickup } from '../../interfaces/models/pickup';
import { Project } from '../../interfaces/models/project';
import { Strings } from '../../interfaces/models/strings';
import { RetailItem } from '../../interfaces/retailitem';

import {
  hasCase,
  hasPickups,
  hasStrings,
  isAcoustic,
  isArchived,
  isDelivered,
  isInProgress,
  isProject,
  isWishlisted
} from './guitarutils';

export function summarizeValidation(items: [string, ReadonlyArray<Map<string, ValidationFlag>>][]): string[] {
  const fallbackString = 'Loading...';

  if (!items) {
    return [ fallbackString ];
  }

  try {
    let preamble = `${items.length} items evaluated`;
    let criticalCount = 0;
    let pleaseCheck = '';
    let missingItem = 0;
    let missingStrings = 0;
    let missingCases = 0;
    let missingPickups = 0;
    let pleaseUpdate = '';

    for (const item of items) {
      if (!item || !item[1]) {
        continue;
      }

      const [ name, validationMap ] = item;

      const count = getValidationCount(validationMap, ValidationFlag.Critical);
      if (count > 0) {
        pleaseCheck += `${name}, `;
        criticalCount += count;
      }

      for (const entry of validationMap.values()) {
        let needsUpdate = false;

        if (entry.has('pickups')) {
          missingItem++;
          missingPickups++;
          needsUpdate = true;
        } else if (entry.has('case')) {
          missingItem++;
          missingCases++;
          needsUpdate = true;
        } else if (entry.has('strings')) {
          missingItem++;
          missingStrings++;
          needsUpdate = true;
        }

        pleaseUpdate += needsUpdate ? `${name}, ` : '';
      }
    }

    return [
      preamble,
      `${criticalCount} critical issues${pleaseCheck ? `, please check: ${pleaseCheck}` : ''}`,
      `${missingItem ? `${missingItem} missing items though - ${missingCases} missing cases, ${missingPickups} missing pickups, ${missingStrings} missing strings` : ''}`,
      `${missingItem ? `Please update missing items in: ${pleaseUpdate}` : ''}`
    ];
  } catch {
    return [ fallbackString ];
  }
}

export function getValidationCount(results: ReadonlyArray<Map<string, ValidationFlag>>, flag: ValidationFlag | null = null): number {
  let count = 0;

  if (!flag) {
    for (const cat of results) {
      count += cat.size;
    }

    return count;
  } else {
    for (const cat of results) {
      if (cat.size < 1) {
        continue;
      }

      try {
        for (const item of cat.values()) {
          if (item === flag) {
            count += 1;
          }
        }
      } catch { continue; }
    }
  }

  return count;
}

export function getValidationPrefix(cat: Map<string, ValidationFlag>, fallbackString: string | number): string {
  const firstEntry = [ ...cat.keys() ][0];

  return firstEntry
    ? firstEntry.split('-')[0] ?? fallbackString.toString()
    : fallbackString.toString();
}

export function getValidationStatus(guitar: Guitar | any): string {
  const validation =
    guitar.validation
      ? (guitar.validation as ReadonlyArray<Map<string, ValidationFlag>>)
      : validate(guitar);

  let missing = 0;
  let warning = 0;
  try {
    for (const validationEntry of validation) {
      for (const flag of validationEntry.values()) {
        switch (flag) {
          case ValidationFlag.Critical:
            return `${ValidationFlag.Critical} issue!`;
          case ValidationFlag.Missing:
            missing += 1;
            break;
          case ValidationFlag.Optional:
            break;
          case ValidationFlag.Warning:
            warning += 1;
            break;
          default:
            break;
        }
      }
    }
  } catch { }

  return (missing < 1 && warning < 1)
    ? 'Valid'
    : warning > 0
      ? `${warning} ${ValidationFlag.Warning}s`
      : `${missing} ${ValidationFlag.Missing} properties`;
}

export function validate(guitar: Guitar | any): Map<string, ValidationFlag>[] {
  const guitarResults = validateGuitar(guitar);

  let projectResults = new Map<string, ValidationFlag>();
  if (isProject(guitar)) {
    projectResults = validateProject(guitar);
  }

  let pickupResults = new Map<string, ValidationFlag>();
  if (guitar.pickups) {
    let idx = 0;
    for (const pickup of guitar.pickups) {
      pickupResults =
        new Map([ ...pickupResults, ...validatePickup(pickup, idx) ]);
      idx++;
    }
  } else if (!isAcoustic(guitar) && !isWishlisted(guitar)) {
    pickupResults.set('pickups', ValidationFlag.Missing);
  }

  let caseResults = new Map<string, ValidationFlag>();
  if (guitar.case && !isArchived(guitar) && guitar.case.id) {
    caseResults = validateCase(guitar.case);
  } else if (!isWishlisted(guitar)
      && !isArchived(guitar)
      && isDelivered(guitar)) {
    caseResults.set('case', ValidationFlag.Missing);
  }

  let stringsResults = new Map<string, ValidationFlag>();
  if (guitar.strings && !isArchived(guitar) && guitar.strings.id) {
    stringsResults = validateStrings(guitar.strings);
  } else if (!isWishlisted(guitar)
      && isDelivered(guitar)
      && !isInProgress(guitar)
      && !isArchived(guitar)) {
    stringsResults.set('strings', ValidationFlag.Missing);
  }

  return [
    guitarResults,
    projectResults,
    pickupResults,
    caseResults,
    stringsResults
  ];
}

function validateGuitar(guitar: Guitar): Map<string, ValidationFlag> {
  const prefix = 'guitar';
  const result = validateRetailItem(guitar, prefix);
  if (!guitar.make) { result.set(`${prefix}-make`, ValidationFlag.Warning); }
  if (!guitar.model) { result.set(`${prefix}-model`, ValidationFlag.Missing); }
  if (!guitar.series) { result.set(`${prefix}-series`, ValidationFlag.Missing); }
  if (!guitar.serialNumber) { result.set(`${prefix}-serialNumber`, ValidationFlag.Missing); }
  if (!guitar.serialNumberLocation) { result.set(`${prefix}-serialNumberLocation`, ValidationFlag.Missing); }
  if (!guitar.bodyStyle) { result.set(`${prefix}-bodyStyle`, ValidationFlag.Missing); }
  if (!guitar.color) { result.set(`${prefix}-color`, ValidationFlag.Warning); }
  if (!guitar.tremolo) { result.set(`${prefix}-tremolo`, ValidationFlag.Optional); }
  if (!guitar.scale) { result.set(`${prefix}-scale`, ValidationFlag.Missing); }
  if (!guitar.numberOfFrets) { result.set(`${prefix}-numberOfFrets`, ValidationFlag.Missing); }
  if (!guitar.tuning) { result.set(`${prefix}-tuning`, ValidationFlag.Optional); }
  if (!guitar.neckRadius) { result.set(`${prefix}-neckRadius`, ValidationFlag.Missing); }
  if (!guitar.nutWidth) { result.set(`${prefix}-nutWidth`, ValidationFlag.Missing); }
  if (!guitar.neckBoltOn) { result.set(`${prefix}-neckBoltOn`, ValidationFlag.Optional); }
  if (!guitar.picture) { result.set(`${prefix}-picture`, ValidationFlag.Missing); }
  if (!guitar.additionalPictures) { result.set(`${prefix}-additionalPictures`, ValidationFlag.Missing); }
  if (!guitar.modifications) { result.set(`${prefix}-modifications`, ValidationFlag.Missing); }
  if (!guitar.controls) { result.set(`${prefix}-controls`, ValidationFlag.Missing); }
  if (!guitar.hasBattery) { result.set(`${prefix}-hasBattery`, ValidationFlag.Missing); }

  if (!validateGuitarId(guitar)) { result.set(`${prefix}-id`, ValidationFlag.Critical); }

  return result;
}

function validateProject(project: Project): Map<string, ValidationFlag> {
  const prefix = 'project';
  const result = validateRetailItem(project, prefix);
  if (!project.projectStart) { result.set(`${prefix}-projectStart`, ValidationFlag.Warning); }
  if (!project.projectComplete) { result.set(`${prefix}-projectComplete`, ValidationFlag.Missing); }
  if (!project.body) { result.set(`${prefix}-body`, ValidationFlag.Missing); }
  if (!project.neck) { result.set(`${prefix}-neck`, ValidationFlag.Missing); }
  if (!project.pickguard) { result.set(`${prefix}-pickguard`, ValidationFlag.Missing); }
  if (!project.purchaseComponentPrice) { result.set(`${prefix}-purchaseComponentPrice`, ValidationFlag.Missing); }

  return result;
}

function validatePickup(pickup: Pickup, idx: number): Map<string, ValidationFlag> {
  const prefix = 'pickup' + idx;
  const result = validateRetailItem(pickup, prefix);
  if (!pickup.type) { result.set(`${prefix}-type`, ValidationFlag.Warning); }
  if (!pickup.size) { result.set(`${prefix}-size`, ValidationFlag.Missing); }
  if (!pickup.position) { result.set(`${prefix}-position`, ValidationFlag.Missing); }
  if (!pickup.output) { result.set(`${prefix}-output`, ValidationFlag.Missing); }
  if (!pickup.mount) { result.set(`${prefix}-mount`, ValidationFlag.Missing); }
  if (!pickup.magnetType) { result.set(`${prefix}-magnetType`, ValidationFlag.Missing); }

  return result;
}

function validateCase(guitarCase: Case): Map<string, ValidationFlag> {
  const prefix = 'case';
  const result = validateRetailItem(guitarCase, prefix);
  if (!guitarCase.caseStyle) { result.set(`${prefix}-caseStyle`, ValidationFlag.Missing); }

  return result;
}

function validateStrings(strings: Strings): Map<string, ValidationFlag> {
  const prefix = 'strings';
  const result = validateRetailItem(strings, prefix);
  if (!strings.gauge) { result.set(`${prefix}-gauge`, ValidationFlag.Missing); }
  if (!strings.numberOfStrings) { result.set(`${prefix}-numberOfStrings`, ValidationFlag.Missing); }
  if (!strings.material) { result.set(`${prefix}-material`, ValidationFlag.Missing); }
  if (!strings.lastChangeDate) { result.set(`${prefix}-lastChangeDate`, ValidationFlag.Missing); }

  return result;
}

function validateRetailItem(item: RetailItem, prefix: string): Map<string, ValidationFlag> {
  const result = new Map<string, ValidationFlag>();
  if (!item) {
    result.set('Item null', ValidationFlag.Critical);
  } else {
    // entry.ts
    if (!item.id) { result.set(`${prefix}-id`, ValidationFlag.Missing); }
    if (!item.name) { result.set(`${prefix}-name`, ValidationFlag.Missing); }
    if (!item.description) { result.set(`${prefix}-description`, ValidationFlag.Missing); }
    if (!item.archive) { result.set(`${prefix}-archiveFlag`, ValidationFlag.Optional); }

    // retailitem.ts
    if (!item.purchaseDate) { result.set(`${prefix}-purchaseDate`, ValidationFlag.Missing); }
    if (!item.deliveryDate) { result.set(`${prefix}-deliveryDate`, ValidationFlag.Optional); }
    if (!item.purchaseStore) { result.set(`${prefix}-purchaseStore`, ValidationFlag.Missing); }
    if (!item.purchasePrice) { result.set(`${prefix}-purchasePrice`, ValidationFlag.Missing); }
    if (!item.currentPrice) { result.set(`${prefix}-currentPrice`, ValidationFlag.Missing); }
    if (!item.productUrl) { result.set(`${prefix}-productUrl`, ValidationFlag.Missing); }
    if (!item.soldDate) { result.set(`${prefix}-soldDate`, ValidationFlag.Optional); }
  }

  return result;
}

function validateGuitarId(guitar: Guitar): boolean {
  if (!guitar.id) {
    return false;
  }

  class Evaluation {
    private _valid = true;
    private _category = ''

    public get valid() {
      return this._valid;
    }

    public get category() {
      return this._category;
    }

    public set valid(result: boolean) {
      if (result === false) {
        this._valid = false;
      }
    }

    public set category(result: string) {
      this._category += `${result}, `;
    }
  }

  let result = new Evaluation();
  const id = guitar.id.toString().substring(0, 2);

  // ID must be numeric
  result.valid = id.match('[0-9]+') ? true : false;

  // Guitar ID must match xx0000
  result.valid = guitar.id.toString().match(`^${id}0+$`) ? true : false;

  if (hasCase(guitar)) {
    // Confirm case starts with guitar ID
    result.valid = guitar.case!.id.toString().startsWith(id);

    // Confirm case ends with 100
    result.valid = guitar.case!.id.toString().match(`^${id}[0-9]?100`) ? true : false;
  }

  if (hasStrings(guitar)) {
    // Confirm strings starts with guitar ID
    result.valid = guitar.strings!.id.toString().startsWith(id);

    // Confirm strings end with 9
    result.valid = guitar.strings!.id.toString().match(`^${id}0+9$`) ? true : false;
  }

  if (hasPickups(guitar)) {
    const pickupCount = guitar.pickups?.length ?? 0;
    for (let idx = 0; idx < pickupCount; idx++) {
      const pickupId = (guitar.pickups ?? [])[idx].id.toString();

      // Confirm each pickup starts with guitar ID
      result.valid = pickupId.startsWith(id);

      // Confirm pickup increments ID in last two digits with a preceeding 1
      result.valid = pickupId.match(`^${id}[0-9]+1${idx}$`) ? true : false;
    }
  }

  return result.valid;
}
