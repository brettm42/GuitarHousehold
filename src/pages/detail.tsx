import * as React from 'react';

import Layout from '../components/Layout';
import ListDetail from '../components/ListDetail';
import GuitarDetail from '../components/GuitarDetail';
import ProjectDetail from '../components/ProjectDetail';

import { NextPageContext } from 'next';

import { Guitar } from '../interfaces/models/guitar';
import { Project } from '../interfaces/models/project';
import { findGuitar } from '../data/guitarservice/guitarservice';

type Props = {
  item?: Guitar
  errors?: string
}

class InitialPropsDetail extends React.Component<Props> {
  static getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { id } = query;
      const item = await findGuitar(Array.isArray(id) ? id[0] : id);
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

    function isGuitar(arg: any): arg is Guitar {
      console.log(`Guitar ${arg.id}`);
      return arg.make !== undefined;
    }

    function isProject(arg: any): arg is Project {
      console.log(`Project ${arg.id}`);
      return arg.body !== undefined;
    }

    return (
      <Layout
        title={`${item ? item.name : 'Detail'}`}
      >
        { isProject(item)
          ? item && <ProjectDetail item={item} />
          : isGuitar(item)
            ? item && <GuitarDetail item={item} />
            : item && <ListDetail item={item} /> }
      </Layout>
    );
  }
}

export default InitialPropsDetail;
