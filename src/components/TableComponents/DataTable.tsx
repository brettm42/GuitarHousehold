import * as React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import DataTableRow from './DataTableRow';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { Entry } from '../../interfaces/entry';
import { getStringText } from '../../data/stringservice/stringservice';

type DataTableProps = {
  items: Entry[];
  columns: string;
};

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      overflowX: 'auto',
      margin: theme.spacing(2)
    },
    table: {}
  };
});

export default function DataTable(props: DataTableProps) {
  const { classes } = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label={getStringText('GuitarDataTabelLabel')}>
        <TableBody>
          {props.items.map((item, idx) =>
            <DataTableRow key={idx} item={item} />)
          }
        </TableBody>
      </Table>
    </Paper>
  );
}
