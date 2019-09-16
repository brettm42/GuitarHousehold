
import * as React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import List from '../components/List';

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
      padding: 15,
      minHeight: 220,
      width: 400,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

const MostPopular: React.FunctionComponent<SummaryProps> = ({
  data: guitars
}) => (
  <div>
    <h3>Most popular:</h3>
    <ul>
      <li>Make: {GuitarUtils.mostCommonMake(guitars)}</li>
      <li>Body: {GuitarUtils.mostCommonBody(guitars)}</li>
      <li>Color: {GuitarUtils.mostCommonColor(guitars)}</li>
      <li>Tuning: {GuitarUtils.mostCommonTuning(guitars)}</li>
      <li>Scale length: {GuitarUtils.mostCommonScale(guitars)}</li>
      <li>Pickup: {GuitarUtils.mostCommonPickupType(guitars)}</li>
      <li>Number of Pickups: {GuitarUtils.mostCommonPickupNumber(guitars)}</li>
    </ul>
  </div>
);

const MissingCase: React.FunctionComponent<SummaryProps> = ({
  data: guitars
}) => (
  <div>
    <h3>Guitars missing cases:</h3>
    <List items={guitars.filter((i: Guitar) => !GuitarUtils.hasCase(i))} />
  </div>
);

const Outliers: React.FunctionComponent<SummaryProps> = ({
  data: guitars
}) => (
  <div>
    <h3>Outliers:</h3>
    <ul>
      <li>Oldest: {GuitarUtils.oldestGuitar(guitars)}</li>
      <li>Newest: {GuitarUtils.newestGuitar(guitars)}</li>
      <li>Most pickups: {GuitarUtils.mostPickups(guitars)}</li>
      <li>Most modifications: {GuitarUtils.mostModifications(guitars)}</li>
      <li>Longest scale: n/a</li>
      <li>Shortest scale: n/a</li>
      <li>Longest project: {GuitarUtils.longestProject(guitars)}</li>
      <li>Shortest project: {GuitarUtils.shortestProject(guitars)}</li>
    </ul>
  </div>
);

const Values: React.FunctionComponent<SummaryProps> = ({
  // data: guitars
}) => (
  <div>
    <h3>Values:</h3>
    <ul>
      <li>Cheapest: $ (with case $)</li>
      <li>Most expensive: $ (with case $)</li>
      <li>Highest case vs. cost: $</li>
      <li>Household: $ (with cases $)</li>
    </ul>
  </div>
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
                <MostPopular data={guitars} />
              </Paper>
            </Grid>
            <Grid key={'cases'} item>
              <Paper className={classes.paper}>
                <MissingCase data={guitars} />
              </Paper>
            </Grid>
            <Grid key={'outliers'} item>
              <Paper className={classes.paper}>
                <Outliers data={guitars} />
              </Paper>
            </Grid>
            <Grid key={'values'} item>
              <Paper className={classes.paper}>
                <Values data={guitars} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>);
};

export default Summary;
