import { Guitar } from '../interfaces/models/guitar';

export enum ValidationFlag {
  None = 'None',
  Critical = 'Critical',
  Warning = 'Warning',
  Missing = 'Missing'
}

export interface PageProps {
  items: Guitar[];
  pathname: string;
};
