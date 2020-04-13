import * as React from 'react';

import { ListDetailProps } from './ListDetail';

const DebugListDetail: React.FunctionComponent<ListDetailProps> = ({
  item: entry,
}) => (
  <div>
    <h1>Debug {entry.name}</h1>
    <p>ID: {entry.id}</p>
  </div>
);

export default DebugListDetail;
