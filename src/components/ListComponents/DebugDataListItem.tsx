import * as React from 'react';

import Link from 'next/link';

import Typography from '@material-ui/core/Typography';

import { DataListItemProps } from './DataListItem';

const DebugDataListItem: React.FunctionComponent<DataListItemProps> = ({ data }) => (
  <Typography>
    <Link href={`/debug?id=${data.id}`}>
      <a>
        {data.id}: {data.name}
      </a>
    </Link>
  </Typography>
);

export default DebugDataListItem;
