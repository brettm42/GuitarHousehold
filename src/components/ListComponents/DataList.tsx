import * as React from 'react';

import DataListItem from './DataListItem';

import { Entry } from '../../interfaces/entry';

type Props = {
  items: Entry[]
}

const DataList: React.FunctionComponent<Props> = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <DataListItem data={item} />
      </li>
    ))}
  </ul>
);

export default DataList;
