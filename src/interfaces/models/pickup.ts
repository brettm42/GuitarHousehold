
import { PickupPosition, PickupType } from "./components";
import { RetailItem } from "../entry";

export interface Pickup extends RetailItem {
    readonly type: PickupType;
    readonly position: PickupPosition;
    readonly output: string;
}
