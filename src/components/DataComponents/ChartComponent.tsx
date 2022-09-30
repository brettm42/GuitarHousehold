import * as React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import {
  AllPurchaseStoreChart,
  GuitarColorChart,
  GuitarMakeChart,
  GuitarPriceChart,
  PurchaseStoreChart, 
  PurchaseYearChart
} from './ChartComponents';
import { Guitar } from '../../interfaces/models/guitar';

type SummaryProps = {
  data: Guitar[];
  isMobile: boolean;
};

const gridColors = [
  'rgba(109, 211, 206, 1)',
  'rgba(200, 233, 160, 1)',
  'rgba(247, 162, 120, 1)',
  'rgba(199, 193, 166, 1)',
  'rgba(212, 164, 184, 1)'
];

const gridPaperStyle = {
  alignSelf: 'stretch',
  height: '100%',
  '&:empty': {
    display: 'none'
  }
};

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      padding: theme.spacing(2)
    },
    grid: {
      flexGrow: 1,
      alignItems: 'stretch'
    },
    mobilePaperGridStyle: {
      '&:empty': {
        display: 'none'
      }
    },
    paper0: {
      ...gridPaperStyle,
      background: gridColors[0]
    },
    paper1: {
      ...gridPaperStyle,
      background: gridColors[1]
    },
    paper2: {
      ...gridPaperStyle,
      background: gridColors[2]
    },
    paper3: {
      ...gridPaperStyle,
      background: gridColors[3]
    },
    paper4: {
      ...gridPaperStyle,
      background: gridColors[4]
    },
    paper5: {
      ...gridPaperStyle,
      background: gridColors[0]
    },
    paper6: {
      ...gridPaperStyle,
      background: gridColors[1]
    },
    paper7: {
      ...gridPaperStyle,
      background: gridColors[2]
    },
    paper8: {
      ...gridPaperStyle,
      background: gridColors[3]
    },
    paper9: {
      ...gridPaperStyle,
      background: gridColors[2]
    },
    paper10: {
      ...gridPaperStyle,
      background: gridColors[4]
    },
    paper11: {
      ...gridPaperStyle,
      background: gridColors[0]
    },
    control: {
      padding: theme.spacing(2),
    }
  };
});

const ChartComponent: React.FunctionComponent<SummaryProps> = ({
  data: guitars, isMobile
}) => {
  const { classes } = useStyles();
  const props = { data: guitars, isMobile: isMobile };

  return (
    <div className={classes.root}>
      <Grid container
        className={classes.grid}
        justifyContent='flex-start'
        spacing={3}
      >
        <Grid key={'price'} item xs={12} sm={6}>
          <Paper className={classes.paper0}>
            <GuitarPriceChart {...props} />
          </Paper>
        </Grid>
        <Grid key={'year'} item xs={12} sm={6}>
          <Paper className={classes.paper1}>
            <PurchaseYearChart {...props} />
          </Paper>
        </Grid>
        <Grid key={'store'} item xs={12} sm={6}>
          <Paper className={classes.paper2}>
            <PurchaseStoreChart {...props} />
          </Paper>
        </Grid>
        <Grid key={'allPurchases'} item xs={12} sm={6}>
          <Paper className={classes.paper3}>
            <GuitarColorChart {...props} />
          </Paper>
        </Grid>
        <Grid key={'makes'} item xs={12} sm={6}>
          <Paper className={classes.paper4}>
            <GuitarMakeChart {...props} />
          </Paper>
        </Grid>  
        <Grid key={'colors'} item xs={12} sm={6}>
          <Paper className={classes.paper5}>
            <AllPurchaseStoreChart {...props} />
          </Paper>
        </Grid>      
      </Grid>
    </div>
  );
};

export default ChartComponent;
