import * as React from 'react';

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';

import { Order, useStyles } from './DataDetailTable';
import { TableDataCell } from './DataDetailTableColumns';
import { Project } from '../../interfaces/models/project';

interface DataDetailTableHeadProps {
  styling: ReturnType<typeof useStyles>;
  columns: ReadonlyArray<TableDataCell>;
  onRequestSort: (event: React.MouseEvent, property: keyof Project) => void;
  order: Order;
  orderBy: string;
}

const DataDetailTableHead: React.FunctionComponent<DataDetailTableHeadProps> =
  ({ styling, columns, onRequestSort, order, orderBy }) => {
    const createSortHandler = (property: keyof Project) => (event: React.MouseEvent) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow key='header'>
          {columns.map(cell => (
            <TableCell align={cell.label === 'id' ? 'center' : 'left' } key={cell.id} sortDirection={orderBy === cell.id ? order : false}>
              <TableSortLabel active={orderBy === cell.id} direction={order} onClick={createSortHandler(cell.id)}>
                <Typography variant='subtitle1'>
                  {cell.label}
                </Typography>
                {orderBy === cell.id
                  ? (<span className={styling.classes.hidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>)
                  : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

export default DataDetailTableHead;
