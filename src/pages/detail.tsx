import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import ListDetail from '../components/DetailComponents/ListDetail';
import GuitarDetail from '../components/DetailComponents/GuitarDetail';
import ProjectDetail from '../components/DetailComponents/ProjectDetail';

import { NextPageContext } from 'next';
import { buildPageTitle, IsMobile } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { findGuitar } from '../data/guitarservice/guitarservice';
import { isGuitar, isProject } from '../data/guitarservice/guitarutils';

type Props = {
  item?: Guitar
  errors?: string
  pathname: string
  isMobile: boolean
}

class InitialPropsDetail extends React.Component<Props> {
  static getInitialProps = async ({ query }: NextPageContext) => {
    const isMobile = IsMobile();

    try {
      const { id } = query;
      const pathname = `/${id}`;

      const item = await findGuitar(Array.isArray(id) ? id[0] : id);

      return { item: item, pathname: pathname, isMobile: isMobile };
    } catch (err) {
      return { errors: err.message };
    }
  };

  render() {
    const { item, errors, pathname, isMobile } = this.props;

    if (errors) {
      console.warn(`Hit error page, ${errors}`);

      return (
        <Layout title={buildPageTitle('Error')} pathname={pathname}>
          <div>
            <Typography>
              <span style={{ color: 'red' }}>Error:</span> {errors}
            </Typography>
          </div>
        </Layout>
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

export default InitialPropsDetail;
