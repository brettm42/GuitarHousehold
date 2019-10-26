import * as React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';

import { Order, useStyles } from './DataDetailTable';
import { Guitar } from '../../interfaces/models/guitar';

interface Props {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent, property: keyof Guitar) => void;
  order: Order;
  orderBy: string;
}

interface tableHeadCell {
  id: keyof Guitar;
  label: string;
}

const tableHeadCells: tableHeadCell[] = [
  { id: 'id', label: 'id' },
  { id: 'name', label: 'Guitar Name' },
  { id: 'bodyStyle', label: 'Guitar Type' },
  { id: 'make', label: 'Guitar Make' },
  { id: 'color', label: 'Guitar Color' },
  { id: 'pickups', label: 'Guitar Pickups' }
]

const DataDetailTableHead: React.FunctionComponent<Props> = ({ classes, onRequestSort, order, orderBy }) => {
  const createSortHandler = (property: keyof Guitar) => (event: React.MouseEvent) => {
    onRequestSort(event, property);
  }

  return (
    <TableHead>
      <TableRow>
        {tableHeadCells.map(cell => (
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