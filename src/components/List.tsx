
import * as React from 'react';
import ListItem from './ListItem';

import { Entry } from '../interfaces/infrastructure';

type Props = {
  items: Entry[]
}

const List: React.FunctionComponent<Props> = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
);

export default List;
