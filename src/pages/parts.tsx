import * as React from 'react';
import Layout from '../components/Layout';
import PartsTable from '../components/TableComponents/PartsTable';
import { GetStaticProps, NextPage } from 'next';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { Part } from '../interfaces/models/part';
import { findAllParts } from '../data/guitarservice/guitarservice';
import { getAvailableAccounts, getDefaultAccount } from '../data/accountservice/accountservice';
import { useAccount } from '../contexts/AccountContext';
import { formatCurrencyToString } from '../infrastructure/datautils';

interface PartsPageProps {
  items: Part[];
  pathname?: string;
  initialAccounts?: any[];
  initialAccountId?: string;
}

const pageTitle = 'Parts & Hardware Inventory';

const PartsPage: NextPage<PartsPageProps> = ({ items: initialItems, pathname }) => {
  const isMobile = IsMobile();
  const { accountData, activeAccount } = useAccount();

  const currentItems = React.useMemo(() => {
    if (accountData && accountData.account.id === activeAccount?.id) {
      return accountData.parts || [];
    }
    return initialItems || [];
  }, [accountData, activeAccount?.id, initialItems]);

  const totalValue = React.useMemo(() => {
    return currentItems.reduce((sum, item) => {
      const price = parseFloat(item.purchasePrice || '0');
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
  }, [currentItems]);

  return (
    <Layout title={buildPageTitle('Parts')} pathname={pathname} isMobile={isMobile}>
      <div className="py-4 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Track necks, bodies, pickups, cases, and components across custom builds
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-neutral-700 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
              Total Value: <span className="text-neutral-900 font-bold">{formatCurrencyToString(totalValue)}</span>
            </span>
          </div>
        </div>

        {currentItems.length > 0 ? (
          <PartsTable items={currentItems} />
        ) : (
          <div className="p-12 text-center bg-white rounded-xl border border-neutral-200 shadow-xs">
            <span className="text-4xl">🔧</span>
            <h3 className="mt-3 text-sm font-semibold text-neutral-900">No parts found</h3>
            <p className="mt-1 text-xs text-neutral-500">
              No parts or components have been registered for this collection yet.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const accounts = getAvailableAccounts();
  const defaultAccount = getDefaultAccount();
  const data = await findAllParts(defaultAccount.id);

  return {
    props: {
      items: data,
      initialAccounts: accounts,
      initialAccountId: defaultAccount.id,
    },
  };
};

export default PartsPage;

