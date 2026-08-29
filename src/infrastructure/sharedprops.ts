import { Guitar } from '../interfaces/models/guitar';
import { Account, AccountData } from '../interfaces/models/account';

export enum ValidationFlag {
  None = 'None',
  Critical = 'Critical',
  Warning = 'Warning',
  Missing = 'Missing',
  Optional = 'Optional',
}

export interface PageProps {
  items: Guitar[];
  pathname: string;
  initialAccounts?: Account[];
  initialAccountId?: string;
  initialData?: AccountData;
}

export interface TextPageProps {
  responses: string[];
  pathname: string;
  initialAccounts?: Account[];
  initialAccountId?: string;
}
