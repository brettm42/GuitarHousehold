
import * as React from 'react';
import { NextPageContext } from 'next';
import Layout from '../components/Layout';
import { Guitar } from '../interfaces/models/guitar';
import { findGuitar } from '../data/guitarservice/guitarservice';
import GuitarDetail from '../components/GuitarDetail';

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
        <Layout title={`Error | Next.js + TypeScript Example`}>
          <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </p>
        </Layout>
      );
    }

    return (
      <Layout
        title={`${item ? item.name : 'Detail'} | Next.js + TypeScript Example`}
      >
        {item && <GuitarDetail item={item} />}
      </Layout>
    );
  }
}

export default GuitarDetailPage;
