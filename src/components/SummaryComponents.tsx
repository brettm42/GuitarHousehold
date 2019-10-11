import * as React from 'react';

import Link from 'next/link';

import Typography from '@material-ui/core/Typography';

import List from '../components/List';

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

    },
    randomPick: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    randomPickImg: {
      maxHeight: 250
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
        `Tremolo Style: ${GuitarUtils.mostCommonTremoloType(guitars)}`,
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
        `Cheapest: ${GuitarUtils.leastExpensive(guitars)} (with case ${GuitarUtils.leastExpensiveWithCase(guitars)})`,
        `Most Expensive: ${GuitarUtils.mostExpensive(guitars)} (with case ${GuitarUtils.mostExpensiveWithCase(guitars)})`,
        `Average Cost: ${GuitarUtils.averageCost(guitars)} (average plus case ${GuitarUtils.averageCostWithCase(guitars)})`,
        `Average Case Cost: ${GuitarUtils.averageCaseCost(guitars)}`,
        `Average Pickup Cost: ${GuitarUtils.averagePickupCost(guitars)}`,
        `Least Expensive Project: ${GuitarUtils.leastExpensiveProject(guitars)}`,
        `Most Expensive Project: ${GuitarUtils.mostExpensiveProject(guitars)}`,
        `Average Project Cost: ${GuitarUtils.averageProjectCost(guitars)}`,
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

const RandomPickComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  function buildGuitarGrid(guitar: Guitar): JSX.Element {
    return (
      <div>
        <Link href={`/detail?id=${guitar.id}`}>
          <a>
            {guitar.picture
              ? <img className={classes.randomPickImg} src={guitar.picture} alt={guitar.name} />
              : '🎸'}
          </a>
        </Link>

        <Typography>
          {guitar.name}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant='subtitle2' gutterBottom>
        Pick of the Day!
      </Typography>

      <div className={classes.randomPick}>
        {buildGuitarGrid(
          GuitarUtils.randomPick(guitars))}      
      </div>
    </div>
  );
};

export { 
  MissingCasesComponent,
  MostCommonComponent,
  OutliersComponent,
  PickupsComponent,
  RandomPickComponent,
  ValuesComponent 
};
