import { RetailItem } from '../retailitem';
import { CaseStyle } from './components';

export interface Case extends RetailItem {
  readonly caseStyle?: CaseStyle;
}
