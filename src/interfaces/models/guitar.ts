import { Case } from './case';
import { Pickup } from './pickup';
import { BodyStyle, SerialNumberLocation, StringType } from './components';
import { RetailItem } from '../entry';

export interface Guitar extends RetailItem {
    readonly make?: string;
    readonly model?: string;
    readonly series?: string;
    readonly serialNumber?: string;
    readonly serialNumberLocation: SerialNumberLocation;
    readonly bodyStyle: BodyStyle;
    readonly color: string;
    readonly pickups: ReadonlyArray<Pickup>;
    readonly strings: StringType;
    readonly case?: Case;
    readonly scale?: string;
    readonly tuning?: string;
    readonly picture?: string;
    readonly modifications?: ReadonlyArray<string>;
}
