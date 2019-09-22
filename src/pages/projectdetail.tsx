import * as React from 'react';

import Layout from '../components/Layout';
import ProjectDetail from '../components/ProjectDetail';

import { NextPageContext } from 'next';

import { Project } from '../interfaces/models/project';
import { findProject } from '../data/guitarservice/guitarservice';

type Props = {
  item?: Project
  errors?: string
}

class ProjectDetailPage extends React.Component<Props> {
  static getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { id } = query;
      const item = await findProject(Array.isArray(id) ? id[0] : id);

      return { item };
    } catch (err) {
      return { errors: err.message };
    }
  }

  render() {
    const { item, errors } = this.props;

    if (errors) {
      return (
        <Layout title={`Error | GuitarHousehold`}>
          <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </p>
        </Layout>
      );
    }

    return (
      <Layout
        title={`${item ? item.name : 'Detail'} | GuitarHousehold`}
      >
        {item && <ProjectDetail item={item} />}
      </Layout>
    );
  }
}

export default ProjectDetailPage;
