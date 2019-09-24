import * as React from 'react';

import Link from 'next/link';

import { Typography } from '@material-ui/core';

import { Entry } from '../interfaces/entry';

type Props = {
  data: Entry
}

const ListItem: React.FunctionComponent<Props> = ({ data }) => (
  <Typography>
    <Link href={`/detail?id=${data.id}`}>
      <a>
        {data.id}: {data.name}
      </a>
    </Link>
  </Typography>
);

export default ListItem;
