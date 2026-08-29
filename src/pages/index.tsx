import * as React from 'react';
import * as Constants from '../infrastructure/constants';
import HouseholdGridList from '../components/HouseholdGridComponents/HouseholdGridList';
import Layout from '../components/Layout';
import Summary from '../components/SummaryComponents/Summary';
import { GetStaticProps, NextPage } from 'next';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/sharedprops';
import {
  findAllGuitars,
  findAllInstruments,
  findAllProjects,
} from '../data/guitarservice/guitarservice';
import { getAvailableAccounts, getDefaultAccount } from '../data/accountservice/accountservice';
import { useAccount } from '../contexts/AccountContext';
import { toListDTOs } from '../infrastructure/dto';

const IndexPage: NextPage<PageProps> = ({ items: initialItems, pathname }) => {
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
    <Layout title={buildPageTitle('Home')} pathname={pathname} isMobile={isMobile}>
      <div className="py-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
            {Constants.SiteTitle}
          </h1>
          {activeAccount && (
            <span className="text-xs sm:text-sm font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200 w-fit">
              {activeAccount.name}
            </span>
          )}
        </div>

        <div>
          <Summary data={currentItems} isMobile={isMobile} />
        </div>

        <hr className="my-8 border-neutral-200" />

        <div>
          <HouseholdGridList data={currentItems} isMobile={isMobile} />
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

export default IndexPage;
