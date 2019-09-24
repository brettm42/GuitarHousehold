import * as React from 'react';

import List from '../components/List';
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Guitar } from '../interfaces/models/guitar';
import * as GuitarUtils from '../data/guitarservice/utils';

type SummaryComponentProps = {
  data: Guitar[]
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    mostCommon: {
    
    },
    missingCases: {
      
    },
    outliers: {
      
    },
    values: {
      
    }
  })
);

const MostCommonComponent: React.FunctionComponent<SummaryComponentProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  return (
    <div className={classes.mostCommon}>
      <Typography variant='subtitle2' gutterBottom>
        Most Common...
      </Typography>
      <ul>
        <li>Make: {GuitarUtils.mostCommonMake(guitars)}</li>
        <li>Body: {GuitarUtils.mostCommonBody(guitars)}</li>
        <li>Color: {GuitarUtils.mostCommonColor(guitars)}</li>
        <li>Tuning: {GuitarUtils.mostCommonTuning(guitars)}</li>
        <li>Scale Length: {GuitarUtils.mostCommonScale(guitars)}</li>
        <li>Pickup: {GuitarUtils.mostCommonPickupType(guitars)}</li>
        <li>Number of Pickups: {GuitarUtils.mostCommonPickupNumber(guitars)}</li>
        <li>Case Style: {GuitarUtils.mostCommonCaseStyle(guitars)}</li>
        <li>Store: {GuitarUtils.mostCommonStore(guitars)}</li>
      </ul>
    </div>
  );
};

const MissingCasesComponent: React.FunctionComponent<SummaryComponentProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  return (
    <div className={classes.missingCases}>
      <Typography variant='subtitle2' gutterBottom>
        Guitars Missing Cases:
      </Typography>
      <List items={guitars.filter((i: Guitar) => !GuitarUtils.hasCase(i))} />
    </div>
  );
};

const OutliersComponent: React.FunctionComponent<SummaryComponentProps> = ({
  data: guitars
}) => {
  const classes = useStyles();
  
  return (
    <div className={classes.outliers}>
      <Typography variant='subtitle2' gutterBottom>
        Outliers:
      </Typography>
      <ul>
        <li>Oldest: <br />{GuitarUtils.oldestGuitar(guitars)}</li>
        <li>Newest: <br />{GuitarUtils.newestGuitar(guitars)}</li>
        <li>Most Pickups: <br />{GuitarUtils.mostPickups(guitars)}</li>
        <li>Most Modifications: <br />{GuitarUtils.mostModifications(guitars)}</li>
        {/* <li>Longest Scale: n/a</li>
        <li>Shortest Scale: n/a</li> */}
        <li>Longest Project: <br />{GuitarUtils.longestProject(guitars)}</li>
        <li>Shortest Project: <br />{GuitarUtils.shortestProject(guitars)}</li>
      </ul>
    </div>
  );
};

const ValuesComponent: React.FunctionComponent<SummaryComponentProps> = ({
  data: guitars
}) => {
  const classes = useStyles();
  
  return (
    <div className={classes.values}>
      <Typography variant='subtitle2' gutterBottom>
        Values:
      </Typography>
      <ul>
        <li>Cheapest: <br />{GuitarUtils.cheapest(guitars)}<br />(with case {GuitarUtils.cheapestWithCase(guitars)})</li>
        <li>Most Expensive: <br />{GuitarUtils.mostExpensive(guitars)}<br />(with case {GuitarUtils.mostExpensiveWithCase(guitars)})</li>
        <li>Average Cost: {GuitarUtils.averageCost(guitars)}<br />(average plus case {GuitarUtils.averageCostWithCase(guitars)})</li>
        {/* <li>Lowest Case vs. Cost: </li>
        <li>Highest Case vs. Cost: </li> */}
        <li>Household: {GuitarUtils.totalCost(guitars)}<br />(with cases {GuitarUtils.totalCostWithCases(guitars)})</li>
      </ul>
    </div>
  );
};

export { MissingCasesComponent, ValuesComponent, OutliersComponent, MostCommonComponent };
