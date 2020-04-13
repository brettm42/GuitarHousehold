import * as React from 'react';

import { NextPageContext } from 'next';

import Error from '../components/Error';

import DebugDataList from '../components/ListComponents/DebugDataList';
import DebugListDetail from '../components/DetailComponents/DebugListDetail';

import { Guitar } from '../interfaces/models/guitar';
import { find, findEverything } from '../data/guitarservice/guitarservice';

type DebugPageProps = {
  items?: Guitar[];
  item?: Guitar;
  errors?: string;
  pathname: string;
};

class DebugPage extends React.Component<DebugPageProps> {
  static getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { id } = query;

      if (id) {
        const pathname = `/${id}`;
        const item = await find(Array.isArray(id) ? id[0] : id);

        return { item: item, pathname: pathname };
      }

      const items: Guitar[] = await findEverything();

      return { items: items };
    } catch (err) {
      return { errors: err.message };
    }
  };

  render() {
    const { items, item, errors, pathname } = this.props;

    if (item) {
      return (
        <div>
          <DebugListDetail item={item} />
        </div>
      );
    } 
    
    if (items) {
      return (
        <div>
          <DebugDataList items={items} />
        </div>
      );
    }
    
    return (
      <Error errors={errors || 'No debug items'} pathname={pathname} />
    );
  };
}

export default DebugPage;
