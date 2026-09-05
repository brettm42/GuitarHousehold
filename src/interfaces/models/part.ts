import { RetailItem } from '../retailitem';
import {
  BodyStyle,
  CaseStyle,
  PickupCover,
  PickupMount,
  PickupPosition,
  PickupSize,
  PickupType,
  SerialNumberLocation,
  TremoloType
} from './components';

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
  readonly serialNumberLocation?: SerialNumberLocation;
  readonly brand?: string;
  readonly model?: string;
  readonly material?: string;
  readonly manufacturer?: string;

  // Neck specific
  readonly scale?: string;
  readonly nutWidth?: string;
  readonly neckRadius?: string;
  readonly numberOfFrets?: number;
  readonly neckMaterial?: string;
  readonly fingerboardMaterial?: string;

  // Body specific
  readonly bodyStyle?: BodyStyle;
  readonly color?: string;
  readonly tremolo?: TremoloType;
  readonly neckBoltOn?: boolean;
  readonly bodyMaterial?: string;
  readonly topMaterial?: string;

  // Pickup specific
  readonly magnetType?: string;
  readonly output?: string;
  readonly cover?: PickupCover;
  readonly mount?: PickupMount;
  readonly size?: PickupSize;
  readonly type?: PickupType;
  readonly position?: PickupPosition;

  // Case specific
  readonly caseStyle?: CaseStyle;

  // Strings specific
  readonly gauge?: string;
  readonly numberOfStrings?: number;
  readonly lastChangeDate?: string;

  // Modifications and media
  readonly modifications?: ReadonlyArray<string>;
  readonly picture?: string;
  readonly pictures?: ReadonlyArray<string>;
  readonly additionalPictures?: ReadonlyArray<string>;
}

