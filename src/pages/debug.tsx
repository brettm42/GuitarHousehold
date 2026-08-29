import Layout from '../components/Layout';
import ErrorComponent from '../components/ErrorComponent';
import DebugDataList from '../components/ListComponents/DebugDataList';
import DebugListDetail from '../components/DetailComponents/DebugListDetail';
import { GetServerSideProps, NextPage } from 'next';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { Guitar } from '../interfaces/models/guitar';
import { find, findEverything } from '../data/guitarservice/guitarservice';
import { getAvailableAccounts, getDefaultAccount } from '../data/accountservice/accountservice';
import { Account } from '../interfaces/models/account';

type DebugPageProps = {
  items?: Guitar[];
  item?: Guitar;
  errors?: string;
  pathname: string;
  initialAccounts?: Account[];
  initialAccountId?: string;
};

const DebugPage: NextPage<DebugPageProps> = ({ items, item, errors, pathname }) => {
  const isMobile = IsMobile();

  if (errors) {
    return <ErrorComponent errors={errors} pathname={pathname} />;
  }

  return (
    <Layout title={buildPageTitle('Debug')} pathname={pathname} isMobile={isMobile}>
      {item ? (
        <DebugListDetail item={item} />
      ) : items ? (
        <DebugDataList items={items} />
      ) : (
        <ErrorComponent errors="No debug items found" pathname={pathname} />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { id, account } = query;
    const accounts = getAvailableAccounts();
    const defaultAccount = getDefaultAccount();
    const accountId = (Array.isArray(account) ? account[0] : account) || defaultAccount.id;

    if (id) {
      const pathname = `/${id}`;
      const item = await find(Array.isArray(id) ? id[0] : id, accountId);

      return {
        props: {
          item,
          pathname,
          initialAccounts: accounts,
          initialAccountId: accountId,
        },
      };
    }

    const items: Guitar[] = await findEverything(accountId);

    return {
      props: {
        items,
        pathname: '/debug',
        initialAccounts: accounts,
        initialAccountId: accountId,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      return { props: { errors: err.message, pathname: '/debug' } };
    } else {
      return { props: { errors: `Unknown error - ${err}`, pathname: '/debug' } };
    }
  }
};

export default DebugPage;
