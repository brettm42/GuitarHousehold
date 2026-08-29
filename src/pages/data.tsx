import * as React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { GetStaticProps, NextPage } from 'next';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/sharedprops';

const ChartComponent = dynamic(() => import('../components/DataComponents/ChartComponent'), {
  ssr: false,
  loading: () => <div className="animate-pulse h-96 bg-neutral-100 rounded-xl" />
});
import {
  findAllGuitars,
  findAllInstruments,
  findAllProjects,
} from '../data/guitarservice/guitarservice';
import { getAvailableAccounts, getDefaultAccount } from '../data/accountservice/accountservice';
import { useAccount } from '../contexts/AccountContext';
import { toListDTOs } from '../infrastructure/dto';

const DataPage: NextPage<PageProps> = ({ items: initialItems, pathname }) => {
  const title = 'Data';
  const isMobile = IsMobile();
  const { accountData, activeAccount } = useAccount();

  const currentItems = React.useMemo(() => {
    if (accountData && accountData.account.id === activeAccount?.id) {
      return [
        ...(accountData.guitars || []),
        ...(accountData.projects || []),
        ...(accountData.instruments || []),
      ];
    }
    return initialItems;
  }, [accountData, activeAccount?.id, initialItems]);

  return (
    <Layout title={buildPageTitle(title)} pathname={pathname} isMobile={isMobile}>
      <div className="py-4 space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
          {title}
        </h1>

        <div>
          <ChartComponent data={currentItems} isMobile={isMobile} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const accounts = getAvailableAccounts();
  const defaultAccount = getDefaultAccount();
  const data = [
    ...(await findAllGuitars(defaultAccount.id)),
    ...(await findAllProjects(defaultAccount.id)),
    ...(await findAllInstruments(defaultAccount.id)),
  ];

  return {
    props: {
      items: toListDTOs(data),
      initialAccounts: accounts,
      initialAccountId: defaultAccount.id,
    },
  };
};

export default DataPage;
