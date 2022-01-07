import * as React from 'react';

import ErrorComponent from '../components/ErrorComponent';
import DebugDataList from '../components/ListComponents/DebugDataList';
import DebugListDetail from '../components/DetailComponents/DebugListDetail';

import { NextPageContext } from 'next';
import { Guitar } from '../interfaces/models/guitar';
import { find, findEverything } from '../data/guitarservice/guitarservice';
import { validate } from '../data/guitarservice/validation';

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

      for (const item of items) {
        item.validation = validate(item);
      }

      return { items };
    } catch (err) {
      if (err instanceof Error) {
        return { errors: err.message };
      } else {
        return { errors: `Unknown error - ${err}`};
      }
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
      <ErrorComponent errors={errors || 'No debug items'} pathname={pathname} />
    );
  };
}

export default DebugPage;
