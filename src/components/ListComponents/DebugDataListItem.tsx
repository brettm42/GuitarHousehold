import * as React from 'react';

import Link from 'next/link';
import Typography from '@mui/material/Typography';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { IsMobile } from '../viewutils';
import { DataListItemProps } from './DataListItem';
import { getValidationStatus } from '../../data/guitarservice/validation';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    row: {
      padding: theme.spacing(1, 0)
    }
  };
});

const DebugDataListItem: React.FunctionComponent<DataListItemProps> = ({ data }) => {
  const { classes } = useStyles();
  const isMobile = IsMobile();

  if (isMobile) {
    return (
      <div className={classes.row}>
        <Typography>
          <Link href={`/debug?id=${data.id}`}>
            <a>
              {data.id}: {data.name}
            </a>
          </Link>
        </Typography>

        <Typography variant='overline'>
          {getValidationStatus(data)}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography>
        <Link href={`/debug?id=${data.id}`}>
          <a>
            {data.id}: {data.name}{data.validation ? ` - ${getValidationStatus(data)}` : ''}
          </a>
        </Link>
      </Typography>
    </div>
  );
};

export default DebugDataListItem;
