import * as React from 'react';

import * as Constants from '../../infrastructure/constants';

import Link from 'next/link';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import DataList from '../../components/ListComponents/DataList';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Guitar } from '../../interfaces/models/guitar';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';

type SummaryComponentProps = {
  title: string;
  contents: [string, string | ReadonlyArray<string>][];
  style: string;
};

type SummaryComponentsProps = {
  data: Guitar[];
  isMobile: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    detail: {
      minWidth: '50%',
      padding: theme.spacing(0, 1, 1, 2)
    },
    detailTitle: {
      textAlign: 'left',
      padding: theme.spacing(1, 0, 0, 1)
    },
    detailChildren: {
      padding: theme.spacing(0, 1)
    },
    detailDivider: {
      minWidth: '50%',
      padding: theme.spacing(0, 1, 2, 2)
    },
    breakdown: {},
    missingCases: {},
    mostCommon: {},
    outliers: {},
    pickups: {},
    strings: {},
    values: {},
    caseValues: {},
    timeline: {},
    randomPickDiv: {
      textAlign: 'center'
    },
    randomPick: {
      display: 'inline-block',
      margin: '0 auto',
      paddingTop: theme.spacing(1)
    },
    randomPickMobile: {
      height: '100%',
      width: 'auto',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    randomPickImg: {
      maxWidth: '100%',
      maxHeight: 300
    },
    randomPickCaption: {
      textAlign: 'left',
      padding: theme.spacing(4),
      paddingTop: theme.spacing(2)
    },
    inProgress: {}
  })
);

function gridLineFormatter(line: [string, string | ReadonlyArray<string>], idx: number, classes: any): JSX.Element {
  if (line[0].startsWith('*')) {
    return (
      <Grid item className={classes.detailDivider} key={idx} xs={12} zeroMinWidth>
        <Divider variant='middle' />
      </Grid>);
  }

  return (
    <Grid item className={classes.detail} key={idx} zeroMinWidth>
      <Typography variant='caption'>
        {line[0]}
      </Typography>
      {Array.isArray(line[1])
        ? <div className={classes.detailChildren}>
            {line[1].map((i, idx) =>
              <Typography key={idx} variant='caption' display='block'>
                {i}
              </Typography>)}
          </div>
        : <Typography gutterBottom>
            {line[1]}
          </Typography>
      }
    </Grid>);
}

const SummaryComponent: React.FunctionComponent<SummaryComponentProps> = ({
  title: title,
  contents: contents,
  style: style
}) => {
  const classes = useStyles();

  return (
    <div className={style}>
      <Typography className={classes.detailTitle} variant='subtitle2' gutterBottom>
        {title}
      </Typography>
      <Grid container>
        {contents.map((line, idx) => gridLineFormatter(line, idx, classes))}
      </Grid>
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
        ['Make', GuitarUtils.mostCommonMake(guitars)],
        ['Body', GuitarUtils.mostCommonBody(guitars)],
        ['Color', GuitarUtils.mostCommonColor(guitars)],
        ['Pickup', GuitarUtils.mostCommonPickupType(guitars)],
        ['Number of Pickups', GuitarUtils.mostCommonPickupNumber(guitars)],
        ['Tuning', GuitarUtils.mostCommonTuning(guitars)],
        ['Scale Length', GuitarUtils.mostCommonScale(guitars)],
        ['Nut Width', GuitarUtils.mostCommonNutWidth(guitars)],
        ['Frets', GuitarUtils.averageFrets(guitars)],
        ['Tremolo Style', GuitarUtils.mostCommonTremoloType(guitars)],
        ['Case Style', GuitarUtils.mostCommonCaseStyle(guitars)],
        ['Store', GuitarUtils.mostCommonStore(guitars)]
      ]}
      style={classes.mostCommon} />
  );
};

const MissingCasesComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  const data = guitars.filter(g => !GuitarUtils.hasCase(g));

  if (!data || data.length < 1) {
    return null;
  }

  return (
    <div className={classes.missingCases}>
      <Typography className={classes.detailTitle} variant='subtitle2' gutterBottom>
        {'Guitars Missing Cases:'}
      </Typography>
      <DataList items={data} />
    </div>
  );
};

const ProjectInProgressComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  const data = guitars.filter(g => GuitarUtils.isInProgress(g));

  if (!data || data.length < 1) {
    return null;
  }

  return (
    <div className={classes.inProgress}>
      <Typography className={classes.detailTitle} variant='subtitle2' gutterBottom>
        {'In Progress Projects:'}
      </Typography>
      <DataList items={data} />
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
        ['Oldest', GuitarUtils.oldestGuitar(guitars)],
        ['Newest', GuitarUtils.newestGuitar(guitars)],
        ['Most Pickups', GuitarUtils.mostPickups(guitars)],
        ['Most Modifications', GuitarUtils.mostModifications(guitars)],
        ['Most Controls', GuitarUtils.mostControls(guitars)],
        ['Most Frets', GuitarUtils.mostFrets(guitars)],
        ['Least Frets', GuitarUtils.leastFrets(guitars)],
        ['*', '*'],
        ['Longest Project', GuitarUtils.longestProject(guitars)],
        ['Shortest Project', GuitarUtils.shortestProject(guitars)]
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
        ['Cheapest', GuitarUtils.leastExpensive(guitars)],
        ['with case', GuitarUtils.leastExpensiveWithCase(guitars)],
        ['Most Expensive', GuitarUtils.mostExpensive(guitars)],
        ['with case', GuitarUtils.mostExpensiveWithCase(guitars)],
        ['Average Cost', `${GuitarUtils.averageCost(guitars)} (average with case ${GuitarUtils.averageCostWithCase(guitars)})`],
        ['*', '*'],
        ['Least Expensive Project', GuitarUtils.leastExpensiveProject(guitars)],
        ['Most Expensive Project', GuitarUtils.mostExpensiveProject(guitars)],
        ['Average Project Cost', GuitarUtils.averageProjectCost(guitars)],
        ['*', '*'],
        ['Household Total', `${GuitarUtils.getHouseholdCost(guitars)} (with cases ${GuitarUtils.getHouseholdCostWithCases(guitars)})`],
      ]}
      style={classes.values} />
  );
};

const PartValuesComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  return (
    <SummaryComponent
      title={'Case/Pickup Values:'}
      contents={[
        ['Most Expensive Case', GuitarUtils.mostExpensiveCase(guitars)],
        ['Cheapest Case', GuitarUtils.leastExpensiveCase(guitars)],
        ['Average Case Cost', GuitarUtils.averageCaseCost(guitars)],
        ['*', '*'],
        ['Most Expensive Pickup', GuitarUtils.mostExpensivePickup(guitars)],
        ['Cheapest Pickup', GuitarUtils.leastExpensivePickup(guitars)],
        ['Average Pickup Cost', GuitarUtils.averagePickupCost(guitars)]
      ]}
      style={classes.caseValues} />
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
        ['Most Common Size', GuitarUtils.mostCommonPickupSize(guitars)],
        ['Highest Output', GuitarUtils.highestPickup(guitars)],
        ['Lowest Output', GuitarUtils.lowestPickup(guitars)],
        ['Average Output', GuitarUtils.averagePickup(guitars)]
      ]}
      style={classes.pickups} />
  );
};

const StringsComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  return (
    <SummaryComponent
      title={'Strings:'}
      contents={[
        ['On Most Guitars', GuitarUtils.mostCommonStrings(guitars)],
        ['Most Common Gauge', GuitarUtils.mostCommonStringGauge(guitars)],
        ['Average String Age', GuitarUtils.averageStringAge(guitars)],
        ['Oldest Strings', GuitarUtils.oldestStrings(guitars)],
        ['Newest Strings', GuitarUtils.newestStrings(guitars)]
      ]}
      style={classes.strings} />
  );
};

const RandomPickComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars, isMobile
}) => {
  const classes = useStyles();

  function buildGuitarGrid(guitar: Guitar): React.ReactElement {
    if (!guitar) {
      return <div />;
    }

    return (
      <div>
        <Link href={`/detail?id=${guitar.id}`}>
          <a>
            {guitar.picture
              ? <img className={classes.randomPickImg} src={guitar.picture} alt={guitar.name} />
              : <Typography variant='h4' gutterBottom>
                  {Constants.ImagePlaceholder}
                </Typography>}
          </a>
        </Link>
        <div className={classes.randomPickCaption}>
          <Typography variant='subtitle1' gutterBottom>
            {guitar.name}
          </Typography>
          <Typography variant='subtitle2' gutterBottom>
            {GuitarUtils.summarizeGuitar(guitar)}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.randomPickDiv}>
      <Typography className={classes.detailTitle} variant='subtitle2' gutterBottom>
        {'Pick of the Day!'}
      </Typography>
      {isMobile
        ? <div className={classes.randomPickMobile}>
            {buildGuitarGrid(GuitarUtils.randomPick(guitars))}
          </div>
        : <div className={classes.randomPick}>
            {buildGuitarGrid(GuitarUtils.randomPick(guitars))}
          </div>}
    </div>
  );
};

const BreakdownComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  return (
    <SummaryComponent
      title={'Breakdown:'}
      contents={[
        ['Acoustic vs. Electric', GuitarUtils.acousticVsElectric(guitars)],
        ['Factory vs. Project', GuitarUtils.factoryVsProject(guitars)],
        ['Sunburst vs. Other Color', GuitarUtils.sunburstVsColor(guitars)],
        ['6 String vs. 12 String', GuitarUtils.sixStringVs12string(guitars)],
        ['Jazzmaster vs. Other Style', GuitarUtils.styleVsOtherStyle('Jazzmaster', guitars)],
        ['Hollowbody vs. Other Style', GuitarUtils.styleVsOtherStyle('Hollowbody', guitars)],
        ['Tremolo vs. Fixed', GuitarUtils.tremoloVsFixed(guitars)],
        ['Humbucker vs. Single Coil', GuitarUtils.humbuckerVsSingleCoil(guitars)],
        ['Flat vs. Arched Case', GuitarUtils.flatVsArchedCase(guitars)],
        ['Has Battery vs. Not', GuitarUtils.hasBatteryVsNot(guitars)]
      ]}
      style={classes.breakdown} />
  );
};

const TimelineComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  return (
    <SummaryComponent
      title={'Timeline:'}
      contents={[
        ['Average per Year', `${GuitarUtils.averageGuitarPerYear(guitars)} guitars`],
        ['Most Guitars Acquired', GuitarUtils.mostGuitarsInAYear(guitars)],
        ['Most Cases Acquired', GuitarUtils.mostCasesInAYear(guitars)],
        ['Guitars This Year', GuitarUtils.guitarsThisYear(guitars)],
        ['Guitars per Year', GuitarUtils.guitarsPerYear(guitars)],
        ['Most Projects Finished', GuitarUtils.mostProjectsInAYear(guitars)],
      ]}
      style={classes.timeline} />
  );
};

export {
  BreakdownComponent,
  MissingCasesComponent,
  MostCommonComponent,
  OutliersComponent,
  PartValuesComponent,
  PickupsComponent,
  ProjectInProgressComponent,
  RandomPickComponent,
  StringsComponent,
  TimelineComponent,
  ValuesComponent
};
