import { Guitar } from '../interfaces/models/guitar';

export enum ValidationFlag {
  None = 'None',
  Critical = 'Critical',
  Warning = 'Warning',
  Missing = 'Missing',
  Optional = 'Optional'
}

export interface PageProps {
  items: Guitar[];
  pathname: string;
};

export interface TextPageProps {
  response: string;
  pathname: string;
}
