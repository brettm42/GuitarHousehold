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

      <TableCell key={`${guitar.id}-style`}>
        <Typography variant='body2'>
          {guitar.bodyStyle}
        </Typography>
      </TableCell>

      <TableCell key={`${guitar.id}-make`}>
        <Typography variant='body2'>
          {guitar.make}
        </Typography>
      </TableCell>

      <TableCell key={`${guitar.id}-color`}>
        <Typography variant='body2'>
          {guitar.color}
        </Typography>
      </TableCell>
      
      <TableCell key={`${guitar.id}-pickups`}>
        <Typography variant='body2'>
          {getPickupCount(guitar)}
        </Typography>
      </TableCell>

      <TableCell key={`${guitar.id}-scale`}>
        <Typography variant='body2'>
          {guitar.scale}
        </Typography>
      </TableCell>

      <TableCell key={`${guitar.id}-date`}>
        <Typography variant='body2'>
          {guitar.purchaseDate}
        </Typography>
      </TableCell>

      <TableCell key={`${guitar.id}-price`}>
        <Typography variant='body2'>
          {guitar.purchasePrice}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default DataDetailTableRow;
