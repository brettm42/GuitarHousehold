import * as React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';

import { Order, useStyles } from './DataDetailTable';
import { TableDataCell } from './DataDetailTableColumns';
import { Project } from '../../interfaces/models/project';

interface DataDetailTableHeadProps {
  classes: ReturnType<typeof useStyles>
  columns: ReadonlyArray<TableDataCell>
  onRequestSort: (event: React.MouseEvent, property: keyof Project) => void
  order: Order
  orderBy: string
}

const DataDetailTableHead: React.FunctionComponent<DataDetailTableHeadProps> = 
    ({ classes, columns, onRequestSort, order, orderBy }) => {
  const createSortHandler = (property: keyof Project) => (event: React.MouseEvent) => {
    onRequestSort(event, property);
  }

  return (
    <TableHead>
      <TableRow key='header'>
        {columns.map(cell => (
          <TableCell key={cell.id} sortDirection={orderBy === cell.id ? order : false}>
            <TableSortLabel active={orderBy === cell.id} direction={order} onClick={createSortHandler(cell.id)}>
              <Typography variant='subtitle1'>
                {cell.label}
              </Typography>
              {orderBy === cell.id
                ? (<span className={classes.hidden}>
                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                   </span>)
                : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default DataDetailTableHead;