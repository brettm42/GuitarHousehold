import * as React from 'react';

import Layout from '../components/Layout';
import ProjectDetail from '../components/DetailComponents/ProjectDetail';

import { NextPageContext } from 'next';
import { Typography } from '@material-ui/core';
import { buildPageTitle } from '../components/viewutils';

import { Project } from '../interfaces/models/project';
import { findProject } from '../data/guitarservice/guitarservice';

type Props = {
  item?: Project,
  errors?: string,
  pathname: string
}

class ProjectDetailPage extends React.Component<Props> {
  static getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { id } = query;
      const pathname = `/${id}`;

      const item = await findProject(Array.isArray(id) ? id[0] : id);

      return { item: item, pathname: pathname };
    } catch (err) {
      return { errors: err.message };
    }
  };

  render() {
    const { item, errors, pathname } = this.props;

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
      <Layout title={buildPageTitle(item ? item.name : 'Details')} pathname={'project' + pathname}>
        <div>
          {item && <ProjectDetail item={item} />}
        </div>
      </Layout>
    );
  };
}

export default ProjectDetailPage;
