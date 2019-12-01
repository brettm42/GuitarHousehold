import { Project } from '../../interfaces/models/project';

import { getPickupCount } from '../../data/guitarservice/guitarutils';

export interface TableDataCell {
  id: keyof Project
  label: string
  formatter?: (data: Project) => string | number
}

export const BaseColumn: ReadonlyArray<TableDataCell> = [
  { id: 'id', label: 'id' },
  { id: 'name', label: 'Name' }
]

export const GuitarColumn: ReadonlyArray<TableDataCell> = [
  { id: 'bodyStyle', label: 'Type' },
  { id: 'make', label: 'Make' },
  { id: 'color', label: 'Color' },
  { id: 'pickups', label: 'Pickups', formatter: getPickupCount },
  { id: 'scale', label: 'Scale' },
  { id: 'purchaseDate', label: 'Purchased' },
  { id: 'purchasePrice', label: 'Purchase Price' }
]

export const ProjectColumn: ReadonlyArray<TableDataCell> = [
  { id: 'bodyStyle', label: 'Type' },
  { id: 'make', label: 'Make' },
  { id: 'color', label: 'Color' },
  { id: 'projectStart', label: 'Project Start' },
  { id: 'projectComplete', label: 'Project Complete' },
  { id: 'pickups', label: 'Pickups', formatter: getPickupCount },
  { id: 'scale', label: 'Scale' }
]
