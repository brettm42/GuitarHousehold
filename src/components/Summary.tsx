import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
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
      minHeight: 220,
      width: 480,
    },
    control: {
      padding: theme.spacing(2),
    }
  }),
);

const Summary: React.FunctionComponent<SummaryProps> = ({
  data: guitars
}) => {
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  return (
    <div>
      <h3>{guitars.length} Guitars ({guitars.filter(g => GuitarUtils.isProject(g)).length} are projects)</h3>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={"auto"}>
          <Grid container justify="flex-start" spacing={spacing}>
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
    </div>);
};

export default Summary;
