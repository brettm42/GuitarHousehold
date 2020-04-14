import * as React from 'react';

import { ListDetailProps } from './ListDetail';

import { Guitar } from '../../interfaces/models/guitar';

import { validateGuitar } from '../../data/guitarservice/validation';

const DebugListDetail: React.FunctionComponent<ListDetailProps> = ({
  item: entry,
}) => (
  <div>
    <h1>Debug {entry.name}</h1>
    <p>ID: {entry.id}</p>
    <hr />
    <div>
      {[ ...validateGuitar(entry as Guitar) ].map(i => {
        return (<p>{JSON.stringify(i)}</p>);
      })}
    </div>
  </div>
);

export default DebugListDetail;
