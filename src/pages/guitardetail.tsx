import * as React from 'react'; 

import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import GuitarDetail from '../components/DetailComponents/GuitarDetail';

import { NextPageContext } from 'next';
import { buildPageTitle, IsMobile } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { findGuitar } from '../data/guitarservice/guitarservice';

type Props = {
  item?: Guitar
  errors?: string
  pathname: string
  isMobile: boolean
}

class GuitarDetailPage extends React.Component<Props> {
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
      <Layout title={buildPageTitle(item ? item.name : 'Details')} pathname={'guitar' + pathname}>
        <div>
          {item && <GuitarDetail item={item} isMobile={isMobile} />}
        </div>
      </Layout>
    );
  };
}

export default GuitarDetailPage;
