import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { MissingCasesComponent, MostCommonComponent, OutliersComponent, ValuesComponent } from './SummaryComponents';

import { Guitar } from '../interfaces/models/guitar';
import * as GuitarUtils from '../data/guitarservice/utils';

type SummaryProps = {
  data: Guitar[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 10,
      minHeight: 300,
      minWidth: 250,
      maxWidth: 400
    },
    control: {
      padding: theme.spacing(2),
    }
  }),
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

      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={"auto"}>
          <Grid container justify="flex-start" spacing={3}>
            <Grid key={'popular'} item>
              <Paper className={classes.paper}>
                <MostCommonComponent data={guitars} />
              </Paper>
            </Grid>
            <Grid key={'cases'} item>
              <Paper className={classes.paper}>
                <MissingCasesComponent data={guitars} />
              </Paper>
            </Grid>
            <Grid key={'outliers'} item>
              <Paper className={classes.paper}>
                <OutliersComponent data={guitars} />
              </Paper>
            </Grid>
            <Grid key={'values'} item>
              <Paper className={classes.paper}>
                <ValuesComponent data={guitars} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Summary;
