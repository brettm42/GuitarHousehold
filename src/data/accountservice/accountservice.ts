import fs from 'fs';
import path from 'path';
import { Account, AccountData } from '../../interfaces/models/account';
import { Guitar } from '../../interfaces/models/guitar';
import { Project } from '../../interfaces/models/project';

const LOCALDB_ROOT = path.join(process.cwd(), 'src', 'data', 'localdb');

const getLocalDbPath = (): string => {
  if (fs.existsSync(LOCALDB_ROOT)) {
    return LOCALDB_ROOT;
  }
  const altPath = path.join(process.cwd(), 'data', 'localdb');
  if (fs.existsSync(altPath)) {
    return altPath;
  }
  return LOCALDB_ROOT;
};

const accountDataCache = new Map<string, AccountData>();

function readAccountJson<T>(accountDir: string, fileName: string, fallback: T): T {
  const filePath = path.join(accountDir, fileName);
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Discovers all account directories under /localdb and parses account metadata and secrets.
 */
export function getAvailableAccounts(): Account[] {
  const dbPath = getLocalDbPath();
  if (!fs.existsSync(dbPath)) {
    return [];
  }

  const entries = fs.readdirSync(dbPath, { withFileTypes: true });
  const accounts: Account[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const accountDir = path.join(dbPath, entry.name);
      const accountJsonPath = path.join(accountDir, 'account.json');
      const assetsJsonPath = path.join(accountDir, 'assets.json');

      let account: Account;

      if (fs.existsSync(accountJsonPath)) {
        try {
          const raw = fs.readFileSync(accountJsonPath, 'utf8');
          account = JSON.parse(raw) as Account;
          if (!account.id) {
            account.id = entry.name;
          }
        } catch {
          account = {
            id: entry.name,
            name: entry.name,
            isDefault: false,
          };
        }
      } else {
        account = {
          id: entry.name,
          name: entry.name,
          isDefault: false,
        };
      }

      // Merge assets.json if present
      if (fs.existsSync(assetsJsonPath)) {
        try {
          const assets = JSON.parse(fs.readFileSync(assetsJsonPath, 'utf8'));
          if (assets.tokens && !account.tokens) {
            account.tokens = assets.tokens;
          }
          if (assets && !account.assets) {
            account.assets = assets;
          }
        } catch {
          // ignore
        }
      }

      accounts.push(account);
    }
  }

  if (accounts.length > 0 && !accounts.some((a) => a.isDefault)) {
    accounts[0].isDefault = true;
  }

  return accounts;
}

/**
 * Retrieves the default account or the first available account.
 */
export function getDefaultAccount(): Account {
  const accounts = getAvailableAccounts();
  if (accounts.length === 0) {
    return {
      id: 'default',
      name: 'Default Account',
      isDefault: true,
    };
  }

  const defaultAccount = accounts.find((a) => a.isDefault);
  return defaultAccount || accounts[0];
}

/**
 * Retrieves an account by its ID.
 */
export function getAccountById(id?: string): Account | undefined {
  if (!id) {
    return getDefaultAccount();
  }
  const accounts = getAvailableAccounts();
  return accounts.find((a) => a.id === id);
}

/**
 * Loads the complete database payload for an account.
 */
export function getAccountDatabase(accountId?: string): AccountData {
  const account = getAccountById(accountId) || getDefaultAccount();

  if (accountDataCache.has(account.id)) {
    return accountDataCache.get(account.id)!;
  }

  const dbPath = getLocalDbPath();
  const accountDir = path.join(dbPath, account.id);

  const guitars = readAccountJson<Guitar[]>(accountDir, 'guitars.json', []);
  const instruments = readAccountJson<Guitar[]>(accountDir, 'instruments.json', []);
  const projects = readAccountJson<Project[]>(accountDir, 'projects.json', []);
  const wishlist = readAccountJson<Guitar[]>(accountDir, 'wishlist.json', []);
  const parts = readAccountJson<any[]>(accountDir, 'parts.json', []);
  const assets = readAccountJson<any>(accountDir, 'assets.json', account.assets || {});

  const data: AccountData = {
    account,
    guitars,
    instruments,
    projects,
    wishlist,
    parts,
    assets,
  };

  accountDataCache.set(account.id, data);
  return data;
}

/**
 * Clears in-memory account data cache.
 */
export function clearAccountCache(): void {
  accountDataCache.clear();
}
