import * as React from 'react';

import ErrorComponent from '../../components/ErrorComponent';
import Layout from '../../components/Layout';
import GuitarDetail from '../../components/DetailComponents/GuitarDetail';
import ListDetail from '../../components/DetailComponents/ListDetail';
import ProjectDetail from '../../components/DetailComponents/ProjectDetail';

import { GetStaticPaths, GetStaticProps } from 'next';
import { buildPageTitle, IsMobile } from '../../components/viewutils';
import { Guitar } from '../../interfaces/models/guitar';
import { RetailItem } from '../../interfaces/retailitem';
import { find, findEverything } from '../../data/guitarservice/guitarservice';
import { isGuitar, isInstrument, isProject } from '../../data/guitarservice/guitarutils';

type DetailPageProps = {
  item?: Guitar;
  errors?: string;
  pathname: string;
};

class DetailPage extends React.Component<DetailPageProps> {
  override render() {
    const { item, errors, pathname } = this.props;
    const isMobile = IsMobile();

    if (errors) {
      return (
        <ErrorComponent errors={errors} pathname={pathname} />
      );
    }

    return (
      <Layout
        title={buildPageTitle(item ? item.name : 'Details')}
        pathname={(isProject(item) ? 'project' : isInstrument(item) ? 'instrument' : 'guitar') + pathname}
        isMobile={isMobile}
      >
        <div>
          {isProject(item)
            ? item && <ProjectDetail item={item} isMobile={isMobile} />
            : (isGuitar(item) || isInstrument(item))
              ? item && <GuitarDetail item={item} isMobile={isMobile} />
              : item && <ListDetail item={item} />}
        </div>
      </Layout>
    );
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const items = await findEverything();

  const paths =
    items.map((i: RetailItem) => (
      {
        params: { id: i.id.toString() }
      }
    ));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params) {
      return {
        props: {
          errors: 'No params to detail page'
        }
      };
    }

    const id = params.id;
    const pathname = `/${id}`;

    if (!id) {
      return {
        props: {
          errors: 'No id param supplied to detail page'
        }
      };
    }

    const item = await find(Array.isArray(id) ? id[0] : id);

    return {
      props: { item, pathname }
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        props: { errors: err.message }
      };
    } else {
      return {
        props: { errors: `Unknown error - ${err}` }
      };
    }
  }
};

export default DetailPage;
