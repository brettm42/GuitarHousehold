import * as React from 'react'; 

import Layout from '../components/Layout';
import GuitarDetail from '../components/GuitarDetail';

import { NextPageContext } from 'next';

import { Guitar } from '../interfaces/models/guitar';
import { findGuitar } from '../data/guitarservice/guitarservice';

type Props = {
  item?: Guitar
  errors?: string
}

class GuitarDetailPage extends React.Component<Props> {
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

    return (
      <Layout
        title={`${item ? item.name : 'Detail'} | GuitarHousehold`}
      >
        {item && <GuitarDetail item={item} />}
      </Layout>
    );
  }
}

export default GuitarDetailPage;
