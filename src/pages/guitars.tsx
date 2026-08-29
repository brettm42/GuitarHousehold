import * as React from 'react';
import GuitarList from '../components/GuitarList';
import { GetStaticProps, NextPage } from 'next';
import { IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/sharedprops';
import { findAllGuitars } from '../data/guitarservice/guitarservice';
import { isArchived } from '../data/guitarservice/guitarutils';
import { getAvailableAccounts, getDefaultAccount } from '../data/accountservice/accountservice';
import { useAccount } from '../contexts/AccountContext';
import { toListDTOs } from '../infrastructure/dto';

const pageTitle = 'Guitar List';
const pageListColumns = 'guitar';

const GuitarsPage: NextPage<PageProps> = ({ items: initialItems, pathname }) => {
  const isMobile = IsMobile();
  const { accountData, activeAccount } = useAccount();

  const currentItems = React.useMemo(() => {
    if (accountData && accountData.account.id === activeAccount?.id) {
      return (accountData.guitars || []).filter((g) => !isArchived(g));
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
  const data = await findAllGuitars(defaultAccount.id);

  return {
    props: {
      items: toListDTOs(data),
      initialAccounts: accounts,
      initialAccountId: defaultAccount.id,
    },
  };
};

export default GuitarsPage;
