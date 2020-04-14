import { Case } from '../../interfaces/models/case';
import { Guitar } from '../../interfaces/models/guitar';
import { Pickup } from '../../interfaces/models/pickup';
import { Project } from '../../interfaces/models/project';
import { RetailItem } from '../../interfaces/retailitem';
import { Strings } from '../../interfaces/models/strings';

import { isProject } from './guitarutils';

const missingString = 'Missing';

export function validateGuitar(guitar: Guitar): Map<string, string>[] {
  const prefix = 'guitar';
  const guitarResults = validateRetailItem(guitar, prefix);
  if (!guitar.make) { guitarResults.set(`${prefix}-make`, missingString); }
  if (!guitar.model) { guitarResults.set(`${prefix}-model`, missingString); }
  if (!guitar.series) { guitarResults.set(`${prefix}-series`, missingString); }
  if (!guitar.serialNumber) { guitarResults.set(`${prefix}-serialNumber`, missingString); }
  if (!guitar.serialNumberLocation) { guitarResults.set(`${prefix}-serialNumberLocation`, missingString); }
  if (!guitar.bodyStyle) { guitarResults.set(`${prefix}-bodyStyle`, missingString); }
  if (!guitar.color) { guitarResults.set(`${prefix}-color`, missingString); }
  if (!guitar.tremolo) { guitarResults.set(`${prefix}-tremolo`, missingString); }
  if (!guitar.scale) { guitarResults.set(`${prefix}-scale`, missingString); }
  if (!guitar.numberOfFrets) { guitarResults.set(`${prefix}-numberOfFrets`, missingString); }
  if (!guitar.tuning) { guitarResults.set(`${prefix}-tuning`, missingString); }
  if (!guitar.neckRadius) { guitarResults.set(`${prefix}-neckRadius`, missingString); }
  if (!guitar.nutWidth) { guitarResults.set(`${prefix}-nutWidth`, missingString); }
  if (!guitar.picture) { guitarResults.set(`${prefix}-picture`, missingString); }
  if (!guitar.modifications) { guitarResults.set(`${prefix}-modifications`, missingString); }
  if (!guitar.controls) { guitarResults.set(`${prefix}-controls`, missingString); }
  if (!guitar.hasBattery) { guitarResults.set(`${prefix}-hasBattery`, missingString); }

  let projectResults = new Map<string, string>();
  if (isProject(guitar)) {
    projectResults = validateProject(guitar);
  }

  let pickupResults = new Map<string, string>();
  if (guitar.pickups) {
    let idx = 0;
    for (const pickup of guitar.pickups) {
      pickupResults = 
        new Map([ ...pickupResults, ...validatePickup(pickup, idx) ]);
      idx++;
    }
  } else {
    pickupResults.set('pickups', missingString);
  }

  let caseResults = new Map<string, string>();
  if (guitar.case && guitar.case.id) {
    caseResults = validateCase(guitar.case);
  } else {
    caseResults.set('case', missingString);
  }

  let stringsResults = new Map<string, string>();
  if (guitar.strings && guitar.strings.id) {
    stringsResults = validateStrings(guitar.strings);
  } else {
    stringsResults.set('strings', missingString);
  }

  return [
    guitarResults,
    projectResults,
    pickupResults,
    caseResults,
    stringsResults
  ];
}

function validateProject(project: Project): Map<string, string> {
  const prefix = 'project';
  const result = validateRetailItem(project, prefix);
  if (!project.projectStart) { result.set(`${prefix}-projectStart`, missingString); }
  if (!project.projectComplete) { result.set(`${prefix}-projectComplete`, missingString); }
  if (!project.body) { result.set(`${prefix}-body`, missingString); }
  if (!project.neck) { result.set(`${prefix}-neck`, missingString); }
  if (!project.pickguard) { result.set(`${prefix}-pickguard`, missingString); }
  if (!project.purchaseComponentPrice) { result.set(`${prefix}-purchaseComponentPrice`, missingString); }

  return result;
}

function validatePickup(pickup: Pickup, idx: number): Map<string, string> {
  const prefix = 'pickup' + idx;
  const result = validateRetailItem(pickup, prefix);
  if (!pickup.type) { result.set(`${prefix}-type`, missingString); }
  if (!pickup.size) { result.set(`${prefix}-size`, missingString); }
  if (!pickup.position) { result.set(`${prefix}-position`, missingString); }
  if (!pickup.output) { result.set(`${prefix}-output`, missingString); }
  if (!pickup.mount) { result.set(`${prefix}-mount`, missingString); }

  return result;
}

function validateCase(guitarCase: Case): Map<string, string> {
  const prefix = 'case';
  const result = validateRetailItem(guitarCase, prefix);
  if (!guitarCase.caseStyle) { result.set(`${prefix}-caseStyle`, missingString); }

  return result;
}

function validateStrings(strings: Strings): Map<string, string> {
  const prefix = 'strings';
  const result = validateRetailItem(strings, prefix);
  if (!strings.gauge) { result.set(`${prefix}-gauge`, missingString); }
  if (!strings.numberOfStrings) { result.set(`${prefix}-numberOfStrings`, missingString); }
  if (!strings.material) { result.set(`${prefix}-material`, missingString); }
  if (!strings.lastChangeDate) { result.set(`${prefix}-lastChangeDate`, missingString); }

  return result;
}

function validateRetailItem(item: RetailItem, prefix: string): Map<string, string> {
  const result = new Map<string, string>();
  if (!item) {
    result.set('Item null', missingString);
  } else {
    // entry.ts
    if (!item.id) { result.set(`${prefix}-id`, missingString); }
    if (!item.name) { result.set(`${prefix}-name`, missingString); }
    if (!item.description) { result.set(`${prefix}-description`, missingString); }
    if (!item.archive) { result.set(`${prefix}-archiveFlag`, missingString); }

    // retailitem.ts
    if (!item.purchaseDate) { result.set(`${prefix}-purchaseDate`, missingString); }
    if (!item.deliveryDate) { result.set(`${prefix}-deliveryDate`, missingString); }
    if (!item.purchaseStore) { result.set(`${prefix}-purchaseStore`, missingString); }
    if (!item.purchasePrice) { result.set(`${prefix}-purchasePrice`, missingString); }
    if (!item.currentPrice) { result.set(`${prefix}-currentPrice`, missingString); }
    if (!item.productUrl) { result.set(`${prefix}-productUrl`, missingString); }
    if (!item.soldDate) { result.set(`${prefix}-soldDate`, missingString); }
  }

  return result;
}
