
import * as React from 'react';
import { NextPageContext } from 'next';
import Layout from '../components/Layout';
import { Guitar } from '../interfaces/models/guitar';
import { Project } from '../interfaces/models/project';
import { findGuitar } from '../data/guitarservice/guitarservice';
import ListDetail from '../components/ListDetail';
import GuitarDetail from '../components/GuitarDetail';
import ProjectDetail from '../components/ProjectDetail';

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
        <Layout title={`Error | Next.js + TypeScript Example`}>
          <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </p>
        </Layout>
      );
    }

    function isGuitar(arg: any): arg is Guitar {
      console.log(arg);
      return arg.make !== undefined;
    }

    function isProject(arg: any): arg is Project {
      console.log(arg);
      return arg.body !== undefined;
    }

    return (
      <Layout
        title={`${item ? item.name : 'Detail'} | Next.js + TypeScript Example`}
      >
        { isGuitar(item)
          ? item && <GuitarDetail item={item} />
          : isProject(item)
            ? item && <ProjectDetail item={item} />
            : item && <ListDetail item={item} /> }
      </Layout>
    );
  }
}

export default InitialPropsDetail;
