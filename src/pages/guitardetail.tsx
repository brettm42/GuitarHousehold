import * as React from 'react'; 

import Layout from '../components/Layout';
import GuitarDetail from '../components/GuitarDetail';

import { NextPageContext } from 'next';
import { Typography } from '@material-ui/core';

import { Guitar } from '../interfaces/models/guitar';
import { findGuitar } from '../data/guitarservice/guitarservice';

type Props = {
  item?: Guitar,
  errors?: string,
  pathname: string
}

class GuitarDetailPage extends React.Component<Props> {
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
        <Layout title={`GuitarHousehold 🎸 | Error`} pathname={pathname}>
          <Typography>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </Typography>
        </Layout>
      );
    }

    return (
      <Layout title={`GuitarHousehold 🎸 | ${item ? item.name : 'Details'}`} pathname={'guitar' + pathname}>
        {item && <GuitarDetail item={item} />}
      </Layout>
    );
  };
}

export default GuitarDetailPage;
