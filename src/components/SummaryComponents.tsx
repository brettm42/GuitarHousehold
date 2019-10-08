import * as React from 'react';

import List from '../components/List';
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Guitar } from '../interfaces/models/guitar';
import * as GuitarUtils from '../data/guitarservice/utils';

type SummaryComponentProps = {
  title: string,
  contents: string[],
  style: string
}

type SummaryComponentsProps = {
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
      
    },
    pickups: {

    }
  })
);

const SummaryComponent: React.FunctionComponent<SummaryComponentProps> = ({
  title: title,
  contents: contents,
  style: style
}) => {  
  return (
    <div className={style}>
      <Typography variant='subtitle2' gutterBottom>
        {title}
      </Typography>
      <ul>
        {contents.map((text, idx) => (
          <li key={idx}>
            <Typography>
              {text}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MostCommonComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  return (
    <SummaryComponent
      title={'Most Common...'}
      contents={[
        `Make: ${GuitarUtils.mostCommonMake(guitars)}`,
        `Body: ${GuitarUtils.mostCommonBody(guitars)}`,
        `Color: ${GuitarUtils.mostCommonColor(guitars)}`,
        `Tuning: ${GuitarUtils.mostCommonTuning(guitars)}`,
        `Scale Length: ${GuitarUtils.mostCommonScale(guitars)}`,
        `Frets: ${GuitarUtils.averageFrets(guitars)}`,
        `Pickup: ${GuitarUtils.mostCommonPickupType(guitars)}`,
        `Number of Pickups: ${GuitarUtils.mostCommonPickupNumber(guitars)}`,
        `Case Style: ${GuitarUtils.mostCommonCaseStyle(guitars)}`,
        `Store: ${GuitarUtils.mostCommonStore(guitars)}`,
        `Acoustics vs. Electrics: ${GuitarUtils.acousticVsElectric(guitars)}`
      ]}
      style={classes.mostCommon} />
    );
  };

const MissingCasesComponent: React.FunctionComponent<SummaryComponentsProps> = ({
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

const OutliersComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const classes = useStyles();
  
  return (
    <SummaryComponent
      title={'Outliers:'}
      contents={[
        `Oldest: ${GuitarUtils.oldestGuitar(guitars)}`,
        `Newest: ${GuitarUtils.newestGuitar(guitars)}`,
        `Most Pickups: ${GuitarUtils.mostPickups(guitars)}`,
        `Most Modifications: ${GuitarUtils.mostModifications(guitars)}`,
        `Most Controls: ${GuitarUtils.mostControls(guitars)}`,
        `Longest Scale: n/a`,
        `Shortest Scale: n/a`,
        `Most Frets: ${GuitarUtils.mostFrets(guitars)}`,
        `Least Frets: ${GuitarUtils.leastFrets(guitars)}`,
        `Longest Project: ${GuitarUtils.longestProject(guitars)}`,
        `Shortest Project: ${GuitarUtils.shortestProject(guitars)}`
      ]}
      style={classes.outliers} />
  );
};

const ValuesComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const classes = useStyles();
  
  return (
    <SummaryComponent
      title={'Values:'}
      contents={[
        `Cheapest: ${GuitarUtils.cheapest(guitars)} (with case ${GuitarUtils.cheapestWithCase(guitars)})`,
        `Most Expensive: ${GuitarUtils.mostExpensive(guitars)} (with case ${GuitarUtils.mostExpensiveWithCase(guitars)})`,
        `Average Cost: ${GuitarUtils.averageCost(guitars)} (average plus case ${GuitarUtils.averageCostWithCase(guitars)})`,
        `Average Case Cost: ${GuitarUtils.averageCaseCost(guitars)}`,
        `Average Pickup Cost: ${GuitarUtils.averagePickupCost(guitars)}`,
        `Household: ${GuitarUtils.totalCost(guitars)} (with cases ${GuitarUtils.totalCostWithCases(guitars)})`,
      ]}
      style={classes.values} />
  );
};

const PickupsComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const classes = useStyles();
  
  return (
    <SummaryComponent
      title={'Pickups:'}
      contents={[
        `Average Output: ${GuitarUtils.averagePickup(guitars)}`,
        `Highest Output: ${GuitarUtils.highestPickup(guitars)}`,
        `Lowest Output: ${GuitarUtils.lowestPickup(guitars)}`
      ]}
      style={classes.pickups} />
  );
};

export { MissingCasesComponent, MostCommonComponent, OutliersComponent, PickupsComponent, ValuesComponent };
