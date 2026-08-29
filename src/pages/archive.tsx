import * as React from 'react';
import GuitarList from '../components/GuitarList';
import { GetStaticProps, NextPage } from 'next';
import { IsMobile } from '../components/viewutils';
import { findAllArchived, findAllSold } from '../data/guitarservice/guitarservice';
import { isArchived, hasSold } from '../data/guitarservice/guitarutils';
import { PageProps } from '../infrastructure/sharedprops';
import { getAvailableAccounts, getDefaultAccount } from '../data/accountservice/accountservice';
import { useAccount } from '../contexts/AccountContext';
import { toListDTOs } from '../infrastructure/dto';

const pageTitle = 'Archive';
const pageListColumns = 'archive';

const ArchivePage: NextPage<PageProps> = ({ items: initialItems, pathname }) => {
  const isMobile = IsMobile();
  const { accountData, activeAccount } = useAccount();

  const currentItems = React.useMemo(() => {
    if (accountData && accountData.account.id === activeAccount?.id) {
      const guitars = accountData.guitars || [];
      return guitars.filter((g) => isArchived(g) || hasSold(g));
    }
    return initialItems;
  }, [accountData, activeAccount?.id, initialItems]);

  return (
    <GuitarList
      items={currentItems}
      pathname={pathname}
      isMobile={isMobile}
      title={pageTitle}
      columns={pageListColumns}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const accounts = getAvailableAccounts();
  const defaultAccount = getDefaultAccount();
  const data = [
    ...(await findAllArchived(defaultAccount.id)),
    ...(await findAllSold(defaultAccount.id)),
  ];

  return {
    props: {
      items: toListDTOs(data),
      initialAccounts: accounts,
      initialAccountId: defaultAccount.id,
    },
  };
};

export default ArchivePage;
