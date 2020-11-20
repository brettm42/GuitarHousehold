import { Project } from '../../interfaces/models/project';

import {
  getGuitarCost,
  getPickupCount,
  getStringGauge
} from '../../data/guitarservice/guitarutils';

export interface TableDataCell {
  id: keyof Project;
  label: string;
  formatter?: (data: Project) => string | number;
}

export const BaseColumns: ReadonlyArray<TableDataCell> = [
  { id: 'id', label: 'id' },
  { id: 'name', label: 'Name' }
];

export const GuitarColumns: ReadonlyArray<TableDataCell> = [
  { id: 'bodyStyle', label: 'Type' },
  { id: 'make', label: 'Make' },
  { id: 'color', label: 'Color' },
  { id: 'pickups', label: 'Pickups', formatter: getPickupCount },
  { id: 'strings', label: 'Strings', formatter: getStringGauge },
  { id: 'scale', label: 'Scale' },
  { id: 'nutWidth', label: 'Nut Width' },
  { id: 'purchaseDate', label: 'Purchased' },
  { id: 'purchasePrice', label: 'Purchase Price' }
];

export const ProjectColumns: ReadonlyArray<TableDataCell> = [
  { id: 'bodyStyle', label: 'Type' },
  { id: 'make', label: 'Make' },
  { id: 'color', label: 'Color' },
  { id: 'projectStart', label: 'Project Start' },
  { id: 'projectComplete', label: 'Project Complete' },
  { id: 'pickups', label: 'Pickups', formatter: getPickupCount },
  { id: 'strings', label: 'Strings', formatter: getStringGauge },
  { id: 'scale', label: 'Scale' },
  { id: 'nutWidth', label: 'Nut Width' },
  { id: 'purchaseComponentPrice', label: 'Project Cost', formatter: getGuitarCost }
];
