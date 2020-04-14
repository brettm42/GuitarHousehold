import { Guitar } from '../interfaces/models/guitar';

export enum ValidationFlag {
  'Critical',
  'Warning',
  'Missing'
}

export interface PageProps {
  items: Guitar[];
  pathname: string;
};
