import * as React from 'react';

import Layout from '../components/Layout';
import ProjectDetail from '../components/ProjectDetail';

import { NextPageContext } from 'next';

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
      return (
        <Layout title={`GuitarHousehold 🎸 | Error`} pathname={pathname}>
          <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </p>
        </Layout>
      );
    }

    return (
      <Layout title={`GuitarHousehold 🎸 | ${item ? item.name : 'Details'}`} pathname={'project' + pathname}>
        {item && <ProjectDetail item={item} />}
      </Layout>
    );
  };
}

export default ProjectDetailPage;
