import { PickupPosition, PickupSize, PickupType } from './components';
import { RetailItem } from '../entry';

export interface Pickup extends RetailItem {
    readonly type: PickupType;
    readonly size?: PickupSize;
    readonly position?: PickupPosition;
    readonly output?: string;
}
