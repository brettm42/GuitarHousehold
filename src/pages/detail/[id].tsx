import ErrorComponent from '../../components/ErrorComponent';
import Layout from '../../components/Layout';
import GuitarDetail from '../../components/DetailComponents/GuitarDetail';
import ListDetail from '../../components/DetailComponents/ListDetail';
import ProjectDetail from '../../components/DetailComponents/ProjectDetail';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { buildPageTitle, IsMobile } from '../../components/viewutils';
import { Guitar } from '../../interfaces/models/guitar';
import { Project } from '../../interfaces/models/project';
import { RetailItem } from '../../interfaces/retailitem';
import { find, findEverything } from '../../data/guitarservice/guitarservice';
import { isGuitar, isInstrument, isProject } from '../../data/guitarservice/guitarutils';
import { getAvailableAccounts, getDefaultAccount } from '../../data/accountservice/accountservice';

type DetailPageProps = {
  item?: Guitar;
  errors?: string;
  pathname: string;
};

const DetailPage: NextPage<DetailPageProps> = ({ item, errors, pathname }) => {
  const isMobile = IsMobile();

  if (errors) {
    return <ErrorComponent errors={errors} pathname={pathname} />;
  }

  const sectionPrefix = isProject(item)
    ? 'project'
    : isInstrument(item)
      ? 'instrument'
      : 'guitar';

  return (
    <Layout
      title={buildPageTitle(item ? item.name : 'Details')}
      pathname={`${sectionPrefix}${pathname}`}
      isMobile={isMobile}
    >
      <div>
        {isProject(item) ? (
          item && <ProjectDetail item={item as Project} isMobile={isMobile} />
        ) : isGuitar(item) || isInstrument(item) ? (
          item && <GuitarDetail item={item} isMobile={isMobile} />
        ) : (
          item && <ListDetail item={item} />
        )}
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const accounts = getAvailableAccounts();
  const allItems: RetailItem[] = [];

  for (const account of accounts) {
    const items = await findEverything(account.id);
    allItems.push(...items);
  }

  const uniqueIds = Array.from(new Set(allItems.map((i) => i.id.toString())));
  const paths = uniqueIds.map((id) => ({
    params: { id },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params) {
      return {
        props: {
          errors: 'No params to detail page',
        },
      };
    }

    const id = params.id;
    const pathname = `/${id}`;

    if (!id) {
      return {
        props: {
          errors: 'No id param supplied to detail page',
        },
      };
    }

    const accounts = getAvailableAccounts();
    const defaultAccount = getDefaultAccount();
    const itemId = Array.isArray(id) ? id[0] : id;

    let item: Guitar | undefined;
    try {
      item = await find(itemId, defaultAccount.id);
    } catch {
      for (const account of accounts) {
        if (account.id === defaultAccount.id) continue;
        try {
          item = await find(itemId, account.id);
          if (item) break;
        } catch {
          // Continue search
        }
      }
    }

    if (!item) {
      return {
        props: {
          errors: `Could not find guitar with ID: ${itemId}`,
          pathname,
        },
      };
    }

    return {
      props: {
        item,
        pathname,
        initialAccounts: accounts,
        initialAccountId: defaultAccount.id,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        props: { errors: err.message, pathname: `/${params?.id ?? ''}` },
      };
    } else {
      return {
        props: { errors: `Unknown error - ${err}`, pathname: `/${params?.id ?? ''}` },
      };
    }
  }
};

export default DetailPage;
