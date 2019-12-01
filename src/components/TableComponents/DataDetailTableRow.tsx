import * as React from 'react';

import Link from 'next/link';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './DataDetailTable';
import { TableDataCell } from './DataDetailTableColumns';
import { Guitar } from '../../interfaces/models/guitar';
import { Project } from '../../interfaces/models/project';

import { summarizeGuitar } from '../../data/guitarservice/guitarutils';

type Props = {
  classes: ReturnType<typeof useStyles>
  columns: ReadonlyArray<TableDataCell>
  guitar: Project
}

const DataDetailTableRow: React.FunctionComponent<Props> = ({ classes, columns, guitar }) => {
  return (
    <TableRow key={guitar.id} tabIndex={-1} hover>
      <TableCell
        key={`${guitar.id}-id`}
        align='center'
        component='th'
        scope='row'
        padding='none'
      >
        <Typography>
          {guitar.id}
        </Typography>
      </TableCell>

      <TableCell key={`${guitar.id}-name`}>
        <Link href={`/detail?id=${guitar.id}`}>
          <a>
            <Typography>
              {guitar.name}
            </Typography>
          </a>
        </Link>
        <div className={classes.description}>
          <Typography variant='caption' gutterBottom>
            {summarizeGuitar(guitar as Guitar)}
          </Typography>
        </div>
      </TableCell>

      {columns.map(cell =>
        cell.id === 'id' || cell.id === 'name'
        ? null
        : <TableCell key={`${guitar.id}-${cell.id}`}>
            <Typography variant='body2'>
              {cell.formatter
                ? cell.formatter(guitar)
                : guitar[cell.id]}
            </Typography>
          </TableCell>
      )}
    </TableRow>
  );
}

export default DataDetailTableRow;
