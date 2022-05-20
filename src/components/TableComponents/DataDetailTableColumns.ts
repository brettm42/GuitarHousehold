import { Project } from '../../interfaces/models/project';
import {
  getControlCount,
  getGuitarCost,
  getModificationCount,
  getPickupCount,
  getStringGauge,
  hasCase
} from '../../data/guitarservice/guitarutils';
import { getStringText } from '../../data/stringservice/stringservice';

export interface TableDataCell {
  id: keyof Project;
  label: string;
  formatter?: (data: Project) => string | number;
}

export const BaseColumns: ReadonlyArray<TableDataCell> = [
  { id: 'id', label: getStringText('DataDetailIdLabel') },
  { id: 'name', label: getStringText('DataDetailNameLabel') },
  { id: 'make', label: getStringText('DataDetailMakeLabel') },
  { id: 'purchaseDate', label: 'Purchased' },
  { id: 'purchasePrice', label: 'Purchase Price' },
  { id: 'purchaseStore', label: 'Purchase Store' }
];

export const GuitarColumns: ReadonlyArray<TableDataCell> = [
  { id: 'bodyStyle', label: 'Type' },
  { id: 'color', label: 'Color' },
  { id: 'manufactureYear', label: 'Manufacture Year' },
  { id: 'pickups', label: 'Pickups', formatter: getPickupCount },
  { id: 'strings', label: 'Strings', formatter: getStringGauge },
  { id: 'scale', label: 'Scale' },
  { id: 'nutWidth', label: 'Nut Width' },
  { id: 'controls', label: 'Controls', formatter: getControlCount },
  { id: 'case', label: 'Has Case', formatter: (i) => hasCase(i).toString() },
  { id: 'modifications', label: 'Modifications', formatter: getModificationCount }
];

export const ProjectColumns: ReadonlyArray<TableDataCell> = [
  { id: 'id', label: getStringText('DataDetailIdLabel') },
  { id: 'name', label: getStringText('DataDetailNameLabel') },
  { id: 'bodyStyle', label: 'Type' },
  { id: 'color', label: 'Color' },
  { id: 'projectStart', label: 'Project Start' },
  { id: 'projectComplete', label: 'Project Complete' },
  { id: 'pickups', label: 'Pickups', formatter: getPickupCount },
  { id: 'strings', label: 'Strings', formatter: getStringGauge },
  { id: 'scale', label: 'Scale' },
  { id: 'nutWidth', label: 'Nut Width' },
  { id: 'manufactureYear', label: 'Manufacture Year' },
  { id: 'controls', label: 'Controls', formatter: getControlCount },
  { id: 'components', label: 'Project Cost', formatter: getGuitarCost },
  { id: 'purchaseStore', label: 'Purchase Store' },
  { id: 'case', label: 'Has Case', formatter: (i) => hasCase(i).toString() },
  { id: 'modifications', label: 'Modifications', formatter: getModificationCount },
  { id: 'make', label: getStringText('DataDetailMakeLabel') },
];
