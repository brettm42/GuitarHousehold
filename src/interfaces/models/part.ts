import { RetailItem } from '../retailitem';

export type PartType =
  | 'Neck'
  | 'Body'
  | 'Pickup'
  | 'Case'
  | 'Strings'
  | 'Hardware'
  | 'Electronics'
  | 'Component'
  | 'Accessory'
  | string;

export interface Part extends RetailItem {
  readonly partType: PartType;
  readonly serialNumber?: string;
  readonly serialNumberLocation?: string;

  // Neck specific
  readonly scale?: string;
  readonly nutWidth?: string;
  readonly neckRadius?: string;
  readonly numberOfFrets?: number;

  // Body specific
  readonly bodyStyle?: string;
  readonly color?: string;
  readonly tremolo?: string;
  readonly neckBoltOn?: boolean;

  // Pickup specific
  readonly magnetType?: string;
  readonly output?: string;
  readonly cover?: string;
  readonly mount?: string;
  readonly size?: string;
  readonly type?: string;
  readonly position?: 'Neck' | 'Middle' | 'Bridge' | string;

  // Case specific
  readonly caseStyle?: 'Flat' | 'Arched' | 'Gig Bag' | string;
}

