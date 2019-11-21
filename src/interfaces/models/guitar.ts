import { Case } from './case';
import { Pickup } from './pickup';
import { Strings } from './strings';
import { 
    BodyStyle, 
    SerialNumberLocation,
    TremoloType
} from './components';
import { RetailItem } from '../retailitem';

export interface Guitar extends RetailItem {
    readonly make: string;
    readonly model?: string;
    readonly series?: string;
    readonly serialNumber?: string;
    readonly serialNumberLocation?: SerialNumberLocation;
    readonly bodyStyle: BodyStyle;
    readonly color: string;
    readonly pickups?: ReadonlyArray<Pickup>;
    readonly strings?: Strings;
    readonly tremolo?: TremoloType;
    readonly case?: Case;
    readonly scale?: string;
    readonly numberOfFrets?: number;
    readonly tuning?: string;
    readonly neckRadius?: string;
    readonly nutWidth?: string;
    readonly picture?: string;
    readonly modifications?: ReadonlyArray<string>;
    readonly controls?: ReadonlyArray<string>;
    readonly hasBattery?: boolean;
}
