import * as React from 'react';

import Error from '../components/Error';
import GuitarDetail from '../components/DetailComponents/GuitarDetail';
import Layout from '../components/Layout';
import ListDetail from '../components/DetailComponents/ListDetail';
import ProjectDetail from '../components/DetailComponents/ProjectDetail';

import { NextPageContext } from 'next';
import { buildPageTitle, IsMobile } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { findInstrument } from '../data/guitarservice/guitarservice';
import { isGuitar, isProject } from '../data/guitarservice/guitarutils';

type DetailPageProps = {
  item?: Guitar;
  errors?: string;
  pathname: string;
  isMobile: boolean;
};

class DetailPage extends React.Component<DetailPageProps> {
  static getInitialProps = async ({ query }: NextPageContext) => {
    const isMobile = IsMobile();

    try {
      const { id } = query;
      const pathname = `/${id}`;

      const item = await findInstrument(Array.isArray(id) ? id[0] : id, true);

      return { item: item, pathname: pathname, isMobile: isMobile };
    } catch (err) {
      return { errors: err.message };
    }
  };

  render() {
    const { item, errors, pathname, isMobile } = this.props;

    if (errors) {
      return (
        <Error errors={errors} pathname={pathname} />
      );
    }

    return (
      <Layout title={buildPageTitle(item ? item.name : 'Details')} pathname={(isProject(item) ? 'project' : 'guitar') + pathname}>
        <div>
          {isProject(item)
            ? item && <ProjectDetail item={item} isMobile={isMobile} />
            : isGuitar(item)
              ? item && <GuitarDetail item={item} isMobile={isMobile} />
              : item && <ListDetail item={item} />}
        </div>
      </Layout>
    );
  };
}

export default DetailPage;
