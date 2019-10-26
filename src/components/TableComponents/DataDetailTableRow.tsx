import * as React from 'react';

import Link from 'next/link';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { Guitar } from '../../interfaces/models/guitar';
import { useStyles } from './DataDetailTable';

import { getPickupCount, summarizeGuitar } from '../../data/guitarservice/guitarutils';

type Props = {
  classes: ReturnType<typeof useStyles>
  guitar: Guitar
}

const DataDetailTableRow: React.FunctionComponent<Props> = ({ classes, guitar }) => {
  return (
    <TableRow key={guitar.id} tabIndex={-1} hover>
      <TableCell align='center' component='th' scope='row' padding='none'>
        <Typography>
          {guitar.id}
        </Typography>
      </TableCell>

      <TableCell>
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

      <TableCell>
        <Typography>
          {guitar.bodyStyle}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography>
          {guitar.make}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography>
          {guitar.color}
        </Typography>
      </TableCell>
      
      <TableCell>
        <Typography>
          {getPickupCount(guitar)}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default DataDetailTableRow;
