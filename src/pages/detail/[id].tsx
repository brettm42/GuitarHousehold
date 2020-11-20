import * as React from 'react';

import Error from '../../components/Error';
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
  isMobile: boolean;
};

class DetailPage extends React.Component<DetailPageProps> {
  render() {
    const { item, errors, pathname, isMobile } = this.props;

    if (errors) {
      return (
        <Error errors={errors} pathname={pathname} />
      );
    }

    return (
      <Layout 
        title={buildPageTitle(item ? item.name : 'Details')} 
        pathname={(isProject(item) ? 'project' : isInstrument(item) ? 'instrument' : 'guitar') + pathname}
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
  const isMobile = IsMobile();

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

    const item = await find(Array.isArray(id) ? id[0] : id);

    return { 
      props: {
        item: item, 
        pathname: pathname, 
        isMobile: isMobile 
      }
    };
  } catch (err) {
    return { 
      props: {
        errors: err.message 
      }
    };
  }
};

export default DetailPage;
