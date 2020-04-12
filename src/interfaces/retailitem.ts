import { Entry } from './entry';

export interface RetailItem extends Entry {
  readonly purchaseDate?: string;
  readonly deliveryDate?: string;
  readonly purchaseStore?: string;
  readonly purchasePrice?: string;
  currentPrice?: string;
  readonly productUrl?: string;
  readonly soldDate?: string;
}
