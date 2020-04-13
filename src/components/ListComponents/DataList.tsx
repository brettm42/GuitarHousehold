import * as React from 'react';

import DataListItem from './DataListItem';

import { Entry } from '../../interfaces/entry';

export type DataListProps = {
  items: Entry[];
};

const DataList: React.FunctionComponent<DataListProps> = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <DataListItem data={item} />
      </li>
    ))}
  </ul>
);

export default DataList;
