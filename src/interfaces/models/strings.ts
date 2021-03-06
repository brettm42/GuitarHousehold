import { RetailItem } from '../retailitem';

export interface Strings extends RetailItem {
  readonly gauge?: string;
  readonly numberOfStrings?: number;
  readonly material?: string;
  readonly lastChangeDate?: string;
}
