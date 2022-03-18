import * as React from 'react';
import * as Constants from '../../infrastructure/constants';

import Link from 'next/link';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DataList from '../../components/ListComponents/DataList';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { Guitar } from '../../interfaces/models/guitar';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';

type SummaryComponentProps = {
  title: string;
  contents: [ string, string | ReadonlyArray<string> ][];
  style: string;
};

type SummaryComponentsProps = {
  data: Guitar[];
  isMobile: boolean;
};

const dividerPlaceholder: [ string, string | readonly string[] ] = [ '*', '*' ];

const useStyles = makeStyles()((theme: Theme) => {
  return {
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
    randomPick: {
      textAlign: 'center'
    },
    randomPickDesktop: {
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
      maxWidth: '90%',
      maxHeight: 400,
      boxShadow: theme.shadows[2]
    },
    randomPickCaption: {
      textAlign: 'left',
      padding: theme.spacing(4),
      paddingTop: theme.spacing(2)
    },
    inProgress: {},
    undelivered: {}
  };
});

function gridLineFormatter(line: [ string, string | ReadonlyArray<string> ], idx: number, classes: any): JSX.Element {
  if (line[0] === '') {
    return <div key={idx} />;
  }

  if (line === dividerPlaceholder || line[0].startsWith('*')) {
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
          </Typography>}
    </Grid>);
}

const SummaryComponent: React.FunctionComponent<SummaryComponentProps> = ({
  title: title,
  contents: contents,
  style: style
}) => {
  const { classes } = useStyles();

  if (!title && !contents) {
    return null;
  }

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
  const { classes } = useStyles();

  return (
    <SummaryComponent
      title={'Most Common...'}
      contents={[
        [ 'Make', GuitarUtils.mostCommonMake(guitars)  ],
        [ 'Body', GuitarUtils.mostCommonBody(guitars)  ],
        [ 'Color', GuitarUtils.mostCommonColor(guitars) ],
        [ 'Pickup', GuitarUtils.mostCommonPickupType(guitars) ],
        [ 'Number of Pickups', GuitarUtils.mostCommonPickupNumber(guitars) ],
        [ 'Tuning', GuitarUtils.mostCommonTuning(guitars) ],
        [ 'Scale Length', GuitarUtils.mostCommonScale(guitars) ],
        [ 'Nut Width', GuitarUtils.mostCommonNutWidth(guitars) ],
        [ 'Neck Radius', GuitarUtils.mostCommonNeckRadius(guitars) ],
        [ 'Frets', GuitarUtils.mostCommonFretCount(guitars) ],
        [ 'Number of Controls', GuitarUtils.mostCommonControlCount(guitars) ],
        [ 'Tremolo Style', GuitarUtils.mostCommonTremoloType(guitars) ],
        [ 'Manufacture Year', GuitarUtils.mostCommonManufactureYear(guitars) ],
        [ 'Case Style', GuitarUtils.mostCommonCaseStyle(guitars) ],
        [ 'Store', GuitarUtils.mostCommonStore(guitars) ],
        [ 'Age', GuitarUtils.mostCommonAge(guitars) ]
      ]}
      style={classes.mostCommon} />
  );
};

const MissingCasesComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const { classes } = useStyles();

  const data = guitars.filter(g => !GuitarUtils.hasCase(g) && GuitarUtils.isDelivered(g));
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
  const { classes } = useStyles();

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

const UndeliveredGuitarsComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const { classes } = useStyles();

  const data = guitars.filter(g => !GuitarUtils.isDelivered(g));
  if (!data || data.length < 1) {
    return null;
  }

  return (
    <div className={classes.undelivered}>
      <Typography className={classes.detailTitle} variant='subtitle2' gutterBottom>
        {'Undelivered:'}
      </Typography>
      <DataList items={data} />
    </div>
  );
};

const OutliersComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const { classes } = useStyles();

  return (
    <SummaryComponent
      title={'Outliers:'}
      contents={[
        [ 'Oldest', GuitarUtils.oldestGuitarPurchase(guitars) ],
        [ 'Newest', GuitarUtils.newestGuitarPurchase(guitars) ],
        [ 'Most Pickups', GuitarUtils.mostPickups(guitars) ],
        [ 'Most Modifications', GuitarUtils.mostModifications(guitars) ],
        [ 'Most Controls', GuitarUtils.mostControls(guitars) ],
        [ 'Most Frets', GuitarUtils.mostFrets(guitars) ],
        [ 'Least Frets', GuitarUtils.leastFrets(guitars) ],
        dividerPlaceholder,
        [ 'Longest Project', GuitarUtils.longestProject(guitars) ],
        [ 'Shortest Project', GuitarUtils.shortestProject(guitars) ],
        dividerPlaceholder,
        [ 'Longest Delivery', GuitarUtils.longestDelivery(guitars) ]
      ]}
      style={classes.outliers} />
  );
};

const ValuesComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const { classes } = useStyles();

  return (
    <SummaryComponent
      title={'Values:'}
      contents={[
        [ 'Cheapest', GuitarUtils.leastExpensiveGuitar(guitars) ],
        [ 'with case', GuitarUtils.leastExpensiveGuitarWithCase(guitars) ],
        [ 'Most Expensive', GuitarUtils.mostExpensiveGuitar(guitars) ],
        [ 'with case', GuitarUtils.mostExpensiveGuitarWithCase(guitars) ],
        [ 'Average Cost', `${GuitarUtils.averageGuitarCost(guitars)} (average with case ${GuitarUtils.averageGuitarCostWithCase(guitars)})` ],
        dividerPlaceholder,
        [ 'Least Expensive Instrument', GuitarUtils.leastExpensiveInstrument(guitars) ],
        [ 'Most Expensive Instrument', GuitarUtils.mostExpensiveInstrument(guitars) ],
        [ 'Average Instrument Cost', GuitarUtils.averageInstrumentCost(guitars) ],
        dividerPlaceholder,
        [ 'Least Expensive Project', GuitarUtils.leastExpensiveProject(guitars) ],
        [ 'Most Expensive Project', GuitarUtils.mostExpensiveProject(guitars) ],
        [ 'Average Project Cost', GuitarUtils.averageProjectCost(guitars) ],
        dividerPlaceholder,
        [ 'Household Total', `${GuitarUtils.getHouseholdCost(guitars)} (with cases ${GuitarUtils.getHouseholdCostWithCases(guitars)})` ]
      ]}
      style={classes.values} />
  );
};

const PartValuesComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const { classes } = useStyles();

  return (
    <SummaryComponent
      title={'Case/Pickup Values:'}
      contents={[
        [ 'Most Expensive Case', GuitarUtils.mostExpensiveCase(guitars) ],
        [ 'Cheapest Case', GuitarUtils.leastExpensiveCase(guitars) ],
        [ 'Average Case Cost', GuitarUtils.averageCaseCost(guitars) ],
        dividerPlaceholder,
        [ 'Most Expensive Pickup', GuitarUtils.mostExpensivePickup(guitars) ],
        [ 'Cheapest Pickup', GuitarUtils.leastExpensivePickup(guitars) ],
        [ 'Average Pickup Cost', GuitarUtils.averagePickupCost(guitars) ]
      ]}
      style={classes.caseValues} />
  );
};

const PickupsComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const { classes } = useStyles();

  return (
    <SummaryComponent
      title={'Pickups:'}
      contents={[
        [ 'Most Common Size', GuitarUtils.mostCommonPickupSize(guitars) ],
        [ 'Most Common Type', GuitarUtils.mostCommonPickupType(guitars) ],
        [ 'Most Common Mount', GuitarUtils.mostCommonPickupMount(guitars) ],
        [ 'Most Common Magnet Type', GuitarUtils.mostCommonPickupMagnetType(guitars) ],
        [ 'Most Common Cover', GuitarUtils.mostCommonPickupCover(guitars) ],
        [ 'Highest Output', GuitarUtils.highestPickup(guitars) ],
        [ 'Lowest Output', GuitarUtils.lowestPickup(guitars) ],
        [ 'Average Output', GuitarUtils.averagePickup(guitars) ]
      ]}
      style={classes.pickups} />
  );
};

const StringsComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const { classes } = useStyles();

  return (
    <SummaryComponent
      title={'Strings:'}
      contents={[
        [ 'On Most Guitars', GuitarUtils.mostCommonStrings(guitars) ],
        [ 'Most Common Gauge', GuitarUtils.mostCommonStringGauge(guitars) ],
        [ 'Average String Age', GuitarUtils.averageStringAge(guitars) ],
        [ 'Oldest Strings', GuitarUtils.oldestStrings(guitars) ],
        [ 'Newest Strings', GuitarUtils.newestStrings(guitars) ]
      ]}
      style={classes.strings} />
  );
};

const RandomPickComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars, isMobile
}) => {
  const { classes } = useStyles();

  function buildGuitarGrid(guitar: Guitar): React.ReactElement {
    if (!guitar) {
      return <div />;
    }

    return (
      <div>
        <Link href={`/detail/${guitar.id}`}>
          <a>
            {guitar.picture
              ? <img className={classes.randomPickImg} src={guitar.picture} alt={guitar.name} loading='lazy' />
              : <Typography variant='h4'>
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
    <div className={classes.randomPick}>
      <Typography className={classes.detailTitle} variant='subtitle2' gutterBottom>
        {'Pick of the Day!'}
      </Typography>
      {isMobile
        ? <div className={classes.randomPickMobile}>
            {buildGuitarGrid(GuitarUtils.randomPick(guitars))}
          </div>
        : <div className={classes.randomPickDesktop}>
            {buildGuitarGrid(GuitarUtils.randomPick(guitars))}
          </div>}
    </div>
  );
};

const BreakdownComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const { classes } = useStyles();

  return (
    <SummaryComponent
      title={'Breakdown:'}
      contents={[
        [ 'Acoustic vs. Electric', GuitarUtils.acousticVsElectric(guitars) ],
        [ 'Factory vs. Project', GuitarUtils.factoryVsProject(guitars) ],
        [ 'Sunburst vs. Other Color', GuitarUtils.sunburstVsColor(guitars) ],
        [ '6 String vs. 12 String', GuitarUtils.sixStringVs12string(guitars) ],
        [ 'Jazzmaster vs. Other Style', GuitarUtils.styleVsOtherStyle('Jazzmaster', guitars) ],
        [ 'Hollowbody vs. Other Style', GuitarUtils.styleVsOtherStyle('Hollowbody', guitars) ],
        [ 'Tremolo vs. Fixed', GuitarUtils.tremoloVsFixed(guitars) ],
        [ 'Humbucker vs. Single Coil', GuitarUtils.humbuckerVsSingleCoil(guitars) ],
        [ 'Swapped vs. Stock Pickups', GuitarUtils.swappedVsFactoryPickups(guitars) ],
        [ 'Flat vs. Arched Case', GuitarUtils.flatVsArchedCase(guitars) ],
        [ 'Has Battery vs. Not', GuitarUtils.hasBatteryVsNot(guitars) ],
        [ 'Bolt-On vs. Set Neck', GuitarUtils.boltOnVsSetNeck(guitars) ]
      ]}
      style={classes.breakdown} />
  );
};

const TimelineComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const { classes } = useStyles();
  const notYetDelivered = GuitarUtils.notYetDelivered(guitars);

  return (
    <SummaryComponent
      title={'Timeline:'}
      contents={[
        [ 'Average per Year', `${GuitarUtils.averageGuitarPerYear(guitars)} guitars` ],
        [ 'Most Guitars Acquired', GuitarUtils.mostGuitarsInAYear(guitars) ],
        [ 'Most Cases Acquired', GuitarUtils.mostCasesInAYear(guitars) ],
        [ 'Guitars This Year', GuitarUtils.guitarsThisYear(guitars) ],
        [ 'Guitars per Year', GuitarUtils.guitarsPerYear(guitars) ],
        [ 'Most Projects Finished', GuitarUtils.mostProjectsInAYear(guitars) ],
        dividerPlaceholder,
        notYetDelivered > 0
          ? [ 'Not Yet Delivered', `${notYetDelivered} instruments` ]
          : [ '', '' ],
        [ 'Average Delivery Time', GuitarUtils.averageDeliveryTime(guitars) ],
        dividerPlaceholder,
        [ 'Oldest Guitar', GuitarUtils.oldestGuitar(guitars) ],
        [ 'Youngest Guitar', GuitarUtils.newestGuitar(guitars) ]
      ]}
      style={classes.timeline} />
  );
};

const ConstructionComponent: React.FunctionComponent<SummaryComponentsProps> = ({
  data: guitars
}) => {
  const { classes } = useStyles();

  return (
    <SummaryComponent
      title={'Construction:'}
      contents={[
        [ 'Most Common Material', GuitarUtils.mostCommonMaterial(guitars) ],
        [ 'Most Common Top', GuitarUtils.mostCommonMaterialTop(guitars) ],
        [ 'Most Common Back', GuitarUtils.mostCommonMaterialBack(guitars) ],
        [ 'Most Common Neck', GuitarUtils.mostCommonMaterialNeck(guitars) ],
        [ 'Most Common Sides', GuitarUtils.mostCommonMaterialSides(guitars) ],
        [ 'Most Common Fingerboard', GuitarUtils.mostCommonMaterialFingerboard(guitars) ],
        dividerPlaceholder,
        [ 'with Veneer Tops', `${GuitarUtils.madeWithVeneerTop(guitars)} instruments`],
        [ 'with Veneer Backs', `${GuitarUtils.madeWithVeneerBack(guitars)} instruments`]
      ]}
      style={classes.strings} />
  );
};

export {
  BreakdownComponent,
  ConstructionComponent,
  MissingCasesComponent,
  MostCommonComponent,
  OutliersComponent,
  PartValuesComponent,
  PickupsComponent,
  ProjectInProgressComponent,
  RandomPickComponent,
  StringsComponent,
  TimelineComponent,
  UndeliveredGuitarsComponent,
  ValuesComponent
};
