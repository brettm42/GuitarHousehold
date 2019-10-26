import * as React from 'react';

import Link from 'next/link';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Entry } from '../../interfaces/entry';
import { Guitar } from '../../interfaces/models/guitar';

import { summarizeGuitar } from '../../data/guitarservice/guitarutils';

type Props = {
  item: Entry
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    description: {
      maxWidth: 300,
      padding: theme.spacing(1, 0, 0, 0)
    }
  })
);

const DataTableRow: React.FunctionComponent<Props> = ({ item }) => {
  const classes = useStyles();
  
  return (
    <TableRow className={classes.root} key={item.id}>
      {/* Column 1 */}
      <TableCell align='center' component='th' scope='row' key={item.id + 0}>
        <Typography>
          {item.id}
        </Typography>
      </TableCell>

      {/* Column 2 */}
      <TableCell align='center' aria-hidden='true' key={item.id + 1}>
        {' — '}
      </TableCell>

      {/* Column 3 */}
      <TableCell key={item.id + 2}>
        <Link href={`/detail?id=${item.id}`}>
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
}

export default DataTableRow;
