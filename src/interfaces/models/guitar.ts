import { Case } from './case';
import { Pickup } from './pickup';
import { BodyStyle, SerialNumberLocation, StringType, TremoloType } from './components';
import { RetailItem } from '../entry';

export interface Guitar extends RetailItem {
    readonly make: string;
    readonly model?: string;
    readonly series?: string;
    readonly serialNumber?: string;
    readonly serialNumberLocation?: SerialNumberLocation;
    readonly bodyStyle: BodyStyle;
    readonly color: string;
    readonly pickups?: ReadonlyArray<Pickup>;
    readonly strings?: StringType;
    readonly numberOfStrings?: number;
    readonly tremolo?: TremoloType;
    readonly case?: Case;
    readonly scale?: string;
    readonly numberOfFrets?: number;
    readonly tuning?: string;
    readonly picture?: string;
    readonly modifications?: ReadonlyArray<string>;
    readonly controls?: ReadonlyArray<string>; 
}
