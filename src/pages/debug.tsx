import * as React from 'react';
import Layout from '../components/Layout';
import ErrorComponent from '../components/ErrorComponent';
import DebugDataList from '../components/ListComponents/DebugDataList';
import DebugListDetail from '../components/DetailComponents/DebugListDetail';
import { NextPageContext } from 'next';
import { buildPageTitle, IsMobile } from '../components/viewutils';
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

      return { items, pathname: '/debug' };
    } catch (err) {
      if (err instanceof Error) {
        return { errors: err.message, pathname: '/debug' };
      } else {
        return { errors: `Unknown error - ${err}`, pathname: '/debug' };
      }
    }
  };

  override render() {
    const { items, item, errors, pathname } = this.props;
    const isMobile = IsMobile();

    if (errors) {
      return <ErrorComponent errors={errors} pathname={pathname} />;
    }

    return (
      <Layout title={buildPageTitle('Debug')} pathname={pathname} isMobile={isMobile}>
        {item ? (
          <DebugListDetail item={item} />
        ) : items ? (
          <DebugDataList items={items} />
        ) : (
          <ErrorComponent errors="No debug items found" pathname={pathname} />
        )}
      </Layout>
    );
  }
}

export default DebugPage;
