import * as React from 'react';
import DataDetailTable, { Columns } from '../components/TableComponents/DataDetailTable';
import DataTable from '../components/TableComponents/DataTable';
import Layout from '../components/Layout';
import { buildPageTitle } from '../components/viewutils';
import { Guitar } from '../interfaces/models/guitar';

type GuitarListProps = {
  items: Guitar[];
  pathname: string;
  isMobile: boolean;
  title: string;
  columns: Columns;
};

const GuitarList: React.FC<GuitarListProps> = ({ items, pathname, isMobile, title, columns }) => {
  return (
    <Layout title={buildPageTitle(title)} pathname={pathname} isMobile={isMobile}>
      <div className="py-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-4">
          {title}
        </h1>

        {items.length > 0 ? (
          isMobile ? (
            <DataTable items={items} columns={columns} />
          ) : (
            <DataDetailTable items={items} columns={columns} />
          )
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-neutral-200 shadow-xs">
            <p className="text-neutral-500 font-medium">
              {`Nothing to see here, looks like no ${title.toLocaleLowerCase()} results were found`}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GuitarList;
