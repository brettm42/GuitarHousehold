import * as React from 'react';

import Link from 'next/link';

import Typography from '@material-ui/core/Typography';

import { DataListItemProps } from './DataListItem';
import { getValidationStatus } from '../../data/guitarservice/validation';

const DebugDataListItem: React.FunctionComponent<DataListItemProps> = ({ data }) => (
  <Typography>
    <Link href={`/debug?id=${data.id}`}>
      <a>
        {data.id}: {data.name}{data.validation ? ` (${getValidationStatus(data)})` : ''}
      </a>
    </Link>
  </Typography>
);

export default DebugDataListItem;
