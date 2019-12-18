import { Entry } from './entry';

export interface RetailItem extends Entry {
    readonly purchaseDate?: string;
    readonly purchaseStore?: string;
    readonly purchasePrice?: string;
    readonly productUrl?: string;
    readonly soldDate?: string;
}
