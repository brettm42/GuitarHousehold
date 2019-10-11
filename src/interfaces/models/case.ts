import { RetailItem } from '../entry';
import { CaseStyle } from './components';

export interface Case extends RetailItem {
    readonly caseStyle?: CaseStyle;
}
