import * as React from 'react';

import DebugDataListItem from './DebugDataListItem';

import { DataListProps } from './DataList';
import { summarizeValidation } from '../../data/guitarservice/validation';

const DebugDataList: React.FunctionComponent<DataListProps> = ({ items }) => {
  const summary = summarizeValidation(
    items.map(i => [i.name, i.validation || [] ]));

  return (
    <div>
      <h1>Debug Page</h1>
      <h3>Validate localdb health</h3>
      {summary.map((i, idx) => (<p key={idx}>{i}</p>))}

      <hr />

      <ul key='debug-list'>
        {items.map(item => (
          <li key={item.id}>
            <DebugDataListItem data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebugDataList;
