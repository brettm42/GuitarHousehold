import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Account, AccountData } from '../interfaces/models/account';

interface AccountContextType {
  accounts: Account[];
  activeAccount: Account | null;
  accountData: AccountData | null;
  isLoading: boolean;
  switchAccount: (accountId: string) => void;
}

const AccountContext = createContext<AccountContextType>({
  accounts: [],
  activeAccount: null,
  accountData: null,
  isLoading: false,
  switchAccount: () => {},
});

const STORAGE_KEY = 'guitar_household_active_account_id';

export const AccountProvider: React.FC<{
  children: React.ReactNode;
  initialAccounts?: Account[];
  initialAccountId?: string;
  initialData?: AccountData;
}> = ({ children, initialAccounts = [], initialAccountId, initialData }) => {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [activeAccount, setActiveAccount] = useState<Account | null>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlAcc = urlParams.get('account');
      const savedAcc = localStorage.getItem(STORAGE_KEY);
      const targetId = urlAcc || savedAcc || initialAccountId;
      if (targetId && initialAccounts.length > 0) {
        const found = initialAccounts.find((a) => a.id === targetId);
        if (found) return found;
      }
    }
    if (initialAccountId && initialAccounts.length > 0) {
      return initialAccounts.find((a) => a.id === initialAccountId) || initialAccounts[0];
    }
    return initialAccounts.find((a) => a.isDefault) || initialAccounts[0] || null;
  });
  const [accountData, setAccountData] = useState<AccountData | null>(initialData || null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAccountData = useCallback(async (accountId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/accounts/${encodeURIComponent(accountId)}/data`);
      if (res.ok) {
        const data: AccountData = await res.json();
        setAccountData(data);
      }
    } catch (err) {
      console.error('Failed to load account database', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch('/api/accounts')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Account[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setAccounts(data);
          const urlParam =
            new URLSearchParams(window.location.search).get('account') ||
            (router.query.account as string | undefined);
          const savedId = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
          const targetId = urlParam || savedId;
          const matched = targetId ? data.find((a) => a.id === targetId) : undefined;
          const targetAccount = matched || data.find((a) => a.isDefault) || data[0];
          setActiveAccount(targetAccount);

          if (targetAccount) {
            fetchAccountData(targetAccount.id);
          }
        }
      })
      .catch(() => {});
  }, [fetchAccountData, router.query.account]);

  const switchAccount = useCallback((accountId: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, accountId);
      window.location.href = `/?account=${encodeURIComponent(accountId)}`;
    }
  }, []);

  return (
    <AccountContext.Provider
      value={{
        accounts,
        activeAccount,
        accountData,
        isLoading,
        switchAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
