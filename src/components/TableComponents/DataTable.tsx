import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import DataTableRow from './DataTableRow';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Entry } from '../../interfaces/entry';

type Props = {
  items: Entry[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflowX: 'auto',
      margin: theme.spacing(2)
    },
    table: {}
  })
);

export default function DataTable(props: Props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='Guitar data table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>id</TableCell>
            <TableCell />
            <TableCell>Guitar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map(item => (
            <DataTableRow item={item} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
