import * as React from 'react';

import DebugDataListItem from './DebugDataListItem';

import { DataListProps } from './DataList';

const DebugDataList: React.FunctionComponent<DataListProps> = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <DebugDataListItem data={item} />
      </li>
    ))}
  </ul>
);

export default DebugDataList;
