import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import ListDetail from '../components/DetailComponents/ListDetail';
import GuitarDetail from '../components/DetailComponents/GuitarDetail';
import ProjectDetail from '../components/DetailComponents/ProjectDetail';

import { NextPageContext } from 'next';
import { buildPageTitle } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { Project } from '../interfaces/models/project';
import { findGuitar } from '../data/guitarservice/guitarservice';

type Props = {
  item?: Guitar,
  errors?: string,
  pathname: string
}

class InitialPropsDetail extends React.Component<Props> {
  static getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { id } = query;
      const pathname = `/${id}`;

      const item = await findGuitar(Array.isArray(id) ? id[0] : id);

      return { item: item, pathname: pathname };
    } catch (err) {
      return { errors: err.message };
    }
  };

  render() {
    const { item, errors, pathname } = this.props;

    if (errors) {
      return (
        <Layout title={buildPageTitle('Error')} pathname={pathname}>
          <Typography>
            <p>
              <span style={{ color: 'red' }}>Error:</span> {errors}
            </p>
          </Typography>
        </Layout>
      );
    }

    function isGuitar(arg: any): arg is Guitar {
      if (arg.make !== undefined) {
        console.log(`Guitar ${arg.id}`);
      }

      return arg.make !== undefined;
    }

    function isProject(arg: any): arg is Project {
      if (arg.body !== undefined) {
        console.log(`Project ${arg.id}`);
      }
      
      return arg.body !== undefined;
    }

    return (
      <Layout title={buildPageTitle(item ? item.name : 'Details')} pathname={(isProject(item) ? 'project' : 'guitar') + pathname}>
        {isProject(item)
          ? item && <ProjectDetail item={item} />
          : isGuitar(item)
            ? item && <GuitarDetail item={item} />
            : item && <ListDetail item={item} />}
      </Layout>
    );
  };
}

export default InitialPropsDetail;
