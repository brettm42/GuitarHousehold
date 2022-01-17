import {
  PickupCover,
  PickupMount,
  PickupPosition,
  PickupSize,
  PickupType
} from './components';
import { RetailItem } from '../retailitem';

export interface Pickup extends RetailItem {
  readonly type: PickupType;
  readonly size?: PickupSize;
  readonly position?: PickupPosition;
  readonly output?: string;
  readonly mount?: PickupMount;
  readonly magnetType?: string;
  readonly cover?: PickupCover;
}
