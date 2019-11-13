import { RetailItem } from '../retailitem';

export interface Strings extends RetailItem {
    readonly name: string;
    readonly gauge?: string;
    readonly lastChangeDate?: string;
}
