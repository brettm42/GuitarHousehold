import { Guitar } from './guitar';
import { Project } from './project';
import { Part } from './part';

export interface AccountTokens {
  reverb?: string;
  [key: string]: string | undefined;
}

export interface AccountAssets {
  footer?: {
    message?: string;
  };
  aboutPage?: {
    images?: string[];
  };
  tokens?: AccountTokens;
  [key: string]: any;
}

export interface Account {
  id: string;
  name: string;
  description?: string;
  created?: string;
  isDefault?: boolean;
  tokens?: AccountTokens;
  assets?: AccountAssets;
}

export interface AccountData {
  account: Account;
  guitars: Guitar[];
  instruments: Guitar[];
  projects: Project[];
  wishlist: Guitar[];
  parts?: Part[];
  assets?: AccountAssets;
}
