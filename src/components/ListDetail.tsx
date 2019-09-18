
import * as React from 'react';

import { Entry } from '../interfaces/entry';

type ListDetailProps = {
  item: Entry
}

const ListDetail: React.FunctionComponent<ListDetailProps> = ({
  item: entry,
}) => (
  <div>
    <h1>Detail for {entry.name}</h1>
    <p>ID: {entry.id}</p>
    <p>Description: {entry.description}</p>
  </div>
);

export default ListDetail;
