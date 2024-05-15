import * as React from 'react';

import DebugDataListItem from './DebugDataListItem';

import { DataListProps } from './DataList';
import { summarizeValidation } from '../../data/guitarservice/validation';
import { ValidationFlag } from '../../infrastructure/sharedprops';

const DebugDataList: React.FunctionComponent<DataListProps> = ({ items }) => {
  const summary = summarizeValidation(
    items.map(i => [ i.name, i.validation || [] ]));

  const criticalItems = [];
  for (const item of items) {
    for (const entry of item.validation ?? []) {
      for (const validation of entry.values()) {
        if (validation === ValidationFlag.Critical) {
          criticalItems.push(item);
        }
      }
    }
  }

  return (
    <div>
      <h1>Debug Page</h1>
      <h3>Validate localdb health</h3>
      {summary.map((i, idx) => (<p key={idx}>{i}</p>))}

      {criticalItems
        ? (<div>
            <h4>Items With Critical Issues:</h4>
            <ul key='critical-debug-list'>
              {criticalItems.map(item => (
                <li key={item.id}>
                  <DebugDataListItem data={item} />
                </li>
              ))}
            </ul>
          </div>)
        : null}

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
