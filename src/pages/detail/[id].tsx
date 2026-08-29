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
  const items = await findEverything();

  const paths = items.map((i: RetailItem) => ({
    params: { id: i.id.toString() },
  }));

  return { paths, fallback: false };
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

    const item = await find(Array.isArray(id) ? id[0] : id);

    return {
      props: { item, pathname },
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
