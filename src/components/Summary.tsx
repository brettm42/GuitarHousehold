import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import {
  BreakdownComponent,
  MissingCasesComponent, 
  MostCommonComponent, 
  OutliersComponent, 
  PickupsComponent,
  RandomPickComponent,
  ValuesComponent
} from './SummaryComponents';

import { Guitar } from '../interfaces/models/guitar';

type SummaryProps = {
  data: Guitar[]
}

const gridPaperStyle = {
  padding: 1,
  minHeight: 280,
  width: 350
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(2)
    },
    paper0: {
      ...gridPaperStyle,
      background: 'lightblue'
    },
    paper1: {
      ...gridPaperStyle,
      background: 'lightgreen'
    },
    paper2: {
      ...gridPaperStyle,
      background: 'lightpink'
    },
    paper3: {
      ...gridPaperStyle,
      background: 'orange'
    },
    paper4: {
      ...gridPaperStyle,
      background: 'lightyellow'
    },
    paper5: {
      ...gridPaperStyle,
      background: 'lightgrey'
    },
    paper6: {
      ...gridPaperStyle,
      background: 'lavender'
    },
    control: {
      padding: theme.spacing(2),
    }
  })
);

const Summary: React.FunctionComponent<SummaryProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root} justify='flex-start' spacing={2}>
        <Grid key={'popular'} item>
          <Paper className={classes.paper0}>
            <MostCommonComponent data={guitars} />
          </Paper>
        </Grid>
        <Grid key={'outliers'} item>
          <Paper className={classes.paper2}>
            <OutliersComponent data={guitars} />
          </Paper>
        </Grid>
        <Grid key={'randomPick'} item>
          <Paper className={classes.paper5}>
            <RandomPickComponent data={guitars} />
          </Paper>
        </Grid>
        <Grid key={'breakdown'} item>
          <Paper className={classes.paper6}>
            <BreakdownComponent data={guitars} />
          </Paper>
        </Grid> 
        <Grid key={'values'} item>
          <Paper className={classes.paper3}>
            <ValuesComponent data={guitars} />
          </Paper>
        </Grid>            
        <Grid key={'cases'} item>
          <Paper className={classes.paper1}>
            <MissingCasesComponent data={guitars} />
          </Paper>
        </Grid>
        <Grid key={'pickups'} item>
          <Paper className={classes.paper4}>
            <PickupsComponent data={guitars} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Summary;
