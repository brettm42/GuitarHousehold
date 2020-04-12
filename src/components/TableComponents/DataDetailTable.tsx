import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import DataDetailTableHead from './DataDetailTableHead';
import DataDetailTableRow from './DataDetailTableRow';
import { BaseColumns, GuitarColumns, ProjectColumns, TableDataCell } from './DataDetailTableColumns';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { isDescending, tableSort } from '../viewutils';

import { Entry } from '../../interfaces/entry';
import { Project } from '../../interfaces/models/project';

type DataDetailTableProps = {
  items: Entry[];
  columns: string;
};

export type Order = 'asc' | 'desc';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    hidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    description: {
      maxWidth: 300,
      padding: theme.spacing(1, 0, 0, 0)
    }
  }),
);

function getTableSorting<K extends keyof any>(order: Order, orderBy: K):
    (a: { [key in K]: any }, b: { [key in K]: any }) => number {
  return order === 'desc'
    ? (a, b) => isDescending(a, b, orderBy)
    : (a, b) => -isDescending(a, b, orderBy);
}

function getTableColumns(columns: string): ReadonlyArray<TableDataCell> {
  return columns.includes('guitar') || columns.includes('archive')
    ? [...BaseColumns, ...GuitarColumns]
    : columns.includes('project')
      ? [...BaseColumns, ...ProjectColumns]
      : BaseColumns;
}

export default function DataDetailTable(props: DataDetailTableProps) {
  const classes = useStyles();
  const guitars = props.items as Project[];

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Project>('id');

  const handleRequestSort = (event: React.MouseEvent, property: keyof Project) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
    event.preventDefault();
  };

  const tableCells = getTableColumns(props.columns);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-label='guitar detailed data table'>
            <DataDetailTableHead
              classes={classes}
              columns={tableCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort} />
            <TableBody>
              {tableSort(guitars, getTableSorting(order, orderBy))
                .map(guitar =>
                  <DataDetailTableRow classes={classes} columns={tableCells} guitar={guitar} />)}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
}
