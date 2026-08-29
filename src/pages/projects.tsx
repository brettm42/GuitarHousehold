import * as React from 'react';
import GuitarList from '../components/GuitarList';
import { GetStaticProps, NextPage } from 'next';
import { IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/sharedprops';
import { findAllProjects } from '../data/guitarservice/guitarservice';
import { isArchived } from '../data/guitarservice/guitarutils';
import { getAvailableAccounts, getDefaultAccount } from '../data/accountservice/accountservice';
import { useAccount } from '../contexts/AccountContext';

const pageTitle = 'Project List';
const pageListColumns = 'project';

const ProjectsPage: NextPage<PageProps> = ({ items: initialItems, pathname }) => {
  const isMobile = IsMobile();
  const { accountData, activeAccount } = useAccount();

  const currentItems = React.useMemo(() => {
    if (accountData && accountData.account.id === activeAccount?.id) {
      return (accountData.projects || []).filter((g) => !isArchived(g));
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
  const data = await findAllProjects(defaultAccount.id);

  return {
    props: {
      items: data,
      initialAccounts: accounts,
      initialAccountId: defaultAccount.id,
    },
  };
};

export default ProjectsPage;
