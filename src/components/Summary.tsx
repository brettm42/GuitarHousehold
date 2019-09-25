import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { MissingCasesComponent, MostCommonComponent, OutliersComponent, ValuesComponent, PickupsComponent } from './SummaryComponents';

import { Guitar } from '../interfaces/models/guitar';
import * as GuitarUtils from '../data/guitarservice/utils';

type SummaryProps = {
  data: Guitar[]
}

const gridPaperStyle = {
  padding: 10,
  minHeight: 270,
  width: 420
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
      background: 'lavender'
    },
    paper5: {
      ...gridPaperStyle,
      background: 'lightgrey'
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
      <Typography variant='h5' gutterBottom>
        {guitars.length} Guitars ({guitars.filter(g => GuitarUtils.isProject(g)).length} are projects)
      </Typography>

      <Typography>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={"auto"}>
            <Grid container justify="flex-start" spacing={3}>
              <Grid key={'popular'} item>
                <Paper className={classes.paper0}>
                  <MostCommonComponent data={guitars} />
                </Paper>
              </Grid>
              <Grid key={'cases'} item>
                <Paper className={classes.paper1}>
                  <MissingCasesComponent data={guitars} />
                </Paper>
              </Grid>
              <Grid key={'outliers'} item>
                <Paper className={classes.paper2}>
                  <OutliersComponent data={guitars} />
                </Paper>
              </Grid>
              <Grid key={'values'} item>
                <Paper className={classes.paper3}>
                  <ValuesComponent data={guitars} />
                </Paper>
              </Grid>
              <Grid key={'pickups'} item>
                <Paper className={classes.paper4}>
                  <PickupsComponent data={guitars} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Typography>
    </div>
  );
};

export default Summary;
