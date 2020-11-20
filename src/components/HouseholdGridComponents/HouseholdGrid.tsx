import * as React from 'react';

import Link from 'next/link';

import Grid from '@material-ui/core/Grid';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Guitar } from '../../interfaces/models/guitar';

type HouseholdGridProps = {
  data: Guitar[];
  isMobile: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    img: {
      height: 250,
      display: 'block',
      margin: '0 auto'
    }
  })
);

const HouseholdGrid: React.FunctionComponent<HouseholdGridProps> = ({
  data: guitars, isMobile
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={isMobile ? 2 : 3}>
        {guitars.map(guitar => (
          <Grid item xs key={guitar.id} zeroMinWidth>
            <Paper className={classes.paper}>
              <Link href={`/detail/${guitar.id}`}>
                <a>
                  <img className={classes.img} src={guitar.picture || ''} alt={guitar.name} />
                  <GridListTileBar
                    title={guitar.name}
                    subtitle={
                      <span>{`${guitar.make} ${guitar.bodyStyle}`}</span>
                    }
                    actionIcon={
                      <IconButton aria-label={`info about ${guitar.name}`} className={classes.icon} />
                    }
                  />
                </a>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HouseholdGrid;
