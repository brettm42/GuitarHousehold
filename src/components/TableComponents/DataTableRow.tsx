import * as React from 'react';

import Link from 'next/link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { Entry } from '../../interfaces/entry';
import { Guitar } from '../../interfaces/models/guitar';
import { summarizeGuitar } from '../../data/guitarservice/guitarutils';
import { getStringText } from '../../data/stringservice/stringservice';

type DataTableRowProps = {
  item: Entry;
};

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {},
    description: {
      maxWidth: 300,
      padding: theme.spacing(1, 0, 0, 0)
    }
  };
});

const DataTableRow: React.FunctionComponent<DataTableRowProps> = ({ item }) => {
  const { classes } = useStyles();

  return (
    <TableRow className={classes.root} key={item.id} tabIndex={-1}>
      <TableCell align='center' component='th' scope='row'>
        <Typography variant='body2'>
          {item.id}
        </Typography>
      </TableCell>

      <TableCell align='center' aria-hidden='true'>
        {getStringText('DataTableSeparator')}
      </TableCell>

      <TableCell>
        <Link href={`/detail/${item.id}`}>
          <a>
            <Typography>
              {item.name}
            </Typography>
          </a>
        </Link>
        <div className={classes.description}>
          <Typography variant='caption' gutterBottom>
            {summarizeGuitar(item as Guitar)}
          </Typography>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DataTableRow;
