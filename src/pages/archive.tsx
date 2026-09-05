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
      const all = [
        ...(accountData.guitars || []),
        ...(accountData.projects || []),
        ...(accountData.instruments || []),
      ];
      const filtered = all.filter((g) => isArchived(g) || hasSold(g));
      const map = new Map<number | string, (typeof all)[0]>();
      for (const item of filtered) {
        map.set(item.id, item);
      }
      return Array.from(map.values());
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
  const archived = await findAllArchived(defaultAccount.id);
  const sold = await findAllSold(defaultAccount.id);

  const map = new Map<number | string, (typeof archived)[0]>();
  for (const item of [...archived, ...sold]) {
    map.set(item.id, item);
  }
  const data = Array.from(map.values());

  return {
    props: {
      items: toListDTOs(data),
      initialAccounts: accounts,
      initialAccountId: defaultAccount.id,
    },
  };
};

export default ArchivePage;
