import * as React from 'react';

import Link from 'next/link';

import Typography from '@material-ui/core/Typography';

import { Entry } from '../../interfaces/entry';

export type DataListItemProps = {
  data: Entry;
};

const DataListItem: React.FunctionComponent<DataListItemProps> = ({ data }) => (
  <Typography>
    <Link href={`/detail?id=${data.id}`}>
      <a>
        {data.id}: {data.name}
      </a>
    </Link>
  </Typography>
);

export default DataListItem;
