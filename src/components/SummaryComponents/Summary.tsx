import * as React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
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
  ValuesComponent
} from './SummaryComponents';

import { Guitar } from '../../interfaces/models/guitar';

type SummaryProps = {
  data: Guitar[];
  isMobile: boolean;
};

const gridColors = [
  'rgba(109, 211, 206, 1)',
  'rgba(200, 233, 160, 1)',
  'rgba(247, 162, 120, 1)',
  'rgba(199, 193, 166, 1)',
  'rgba(212, 164, 184, 1)'
];

const gridPaperStyle = {
  padding: 1,
  alignSelf: 'stretch',
  height: '100%',
  '&:empty': {
    display: 'none'
  }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      alignItems: 'stretch',
      padding: theme.spacing(1)
    },
    mobilePaperGridStyle: {
      '&:empty': {
        display: 'none'
      }
    },
    paper0: {
      ...gridPaperStyle,
      background: gridColors[0]
    },
    paper1: {
      ...gridPaperStyle,
      background: gridColors[1]
    },
    paper2: {
      ...gridPaperStyle,
      background: gridColors[2]
    },
    paper3: {
      ...gridPaperStyle,
      background: gridColors[3]
    },
    paper4: {
      ...gridPaperStyle,
      background: gridColors[4]
    },
    paper5: {
      ...gridPaperStyle,
      background: gridColors[0]
    },
    paper6: {
      ...gridPaperStyle,
      background: gridColors[1]
    },
    paper7: {
      ...gridPaperStyle,
      background: gridColors[2]
    },
    paper8: {
      ...gridPaperStyle,
      background: gridColors[3]
    },
    paper9: {
      ...gridPaperStyle,
      background: gridColors[0]
    },
    paper10: {
      ...gridPaperStyle,
      background: gridColors[4]
    },
    paper11: {
      ...gridPaperStyle,
      background: gridColors[3]
    },
    control: {
      padding: theme.spacing(2),
    }
  })
);

const Summary: React.FunctionComponent<SummaryProps> = ({
  data: guitars, isMobile
}) => {
  const classes = useStyles();
  const props = { data: guitars, isMobile: isMobile };

  const desktopGrid = (
    <Grid container
      className={classes.root}
      justifyContent='flex-start'
      spacing={2}
    >
      <Grid key={'popular'} item xs={6} sm={4}>
        <Paper className={classes.paper0}>
          <MostCommonComponent {...props} />
        </Paper>
      </Grid>
      <Grid key={'outliers'} item xs={6} sm={4}>
        <Paper className={classes.paper1}>
          <OutliersComponent {...props} />
        </Paper>
      </Grid>
      <Grid key={'randomPick'} item xs={6} sm={4}>
        <Paper className={classes.paper2}>
          <RandomPickComponent {...props} />
        </Paper>
      </Grid>
      <Grid key={'breakdown'} item xs={6} sm={4}>
        <Paper className={classes.paper3}>
          <BreakdownComponent {...props} />
        </Paper>
      </Grid>
      <Grid key={'pickups'} item xs={6} sm={4}>
        <Paper className={classes.paper4}>
          <PickupsComponent {...props} />
        </Paper>
      </Grid>
      <Grid key={'strings'} item xs={6} sm={4}>
        <Paper className={classes.paper5}>
          <StringsComponent {...props} />
        </Paper>
      </Grid>
      <Grid key={'timeline'} item xs={6} sm={4}>
        <Paper className={classes.paper6}>
          <TimelineComponent {...props} />
        </Paper>
      </Grid>
      <Grid key={'cases'} item xs={6} sm={4}>
        <Paper className={classes.paper7}>
          <MissingCasesComponent {...props} />
        </Paper>
      </Grid>
      <Grid key={'values'} item xs={6} sm={4}>
        <Paper className={classes.paper8}>
          <ValuesComponent {...props} />
        </Paper>
      </Grid>
      <Grid key={'partValues'} item xs={6} sm={4}>
        <Paper className={classes.paper9}>
          <PartValuesComponent {...props} />
        </Paper>
      </Grid>
      <Grid key={'construction'} item xs={6} sm={4}>
        <Paper className={classes.paper10}>
          <ConstructionComponent {...props} />
        </Paper>
      </Grid>
      <Grid key={'inProgress'} item xs={6} sm={4}>
        <Paper className={classes.paper11}>
          <ProjectInProgressComponent {...props} />
        </Paper>
      </Grid>
    </Grid>
  );

  const mobileGrid = (
    <Grid container
      className={classes.root}
      justifyContent='space-between'
      direction='column'
      spacing={2}
    >
      <Grid key={'popular'} item xs={12} sm={6}>
        <Paper>
          <Accordion className={classes.paper0}>
            <AccordionSummary id='panelMostCommon-header' aria-controls='panelMostCommon-content'>
              <Typography variant='overline'>
                {'Most Common'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <MostCommonComponent {...props} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid key={'outliers'} item xs={12} sm={6}>
        <Paper>
          <Accordion className={classes.paper1}>
            <AccordionSummary id='panelOutliers-header' aria-controls='panelOutliers-content'>
              <Typography variant='overline'>
                {'Outliers'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <OutliersComponent {...props} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid key={'randomPick'} item xs={12} sm={6}>
        <Paper>
          <Accordion className={classes.paper2}>
            <AccordionSummary id='panelRandom-header' aria-controls='panelRandom-content'>
              <Typography variant='overline'>
                {'Random Pick'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <RandomPickComponent {...props} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid key={'breakdown'} item xs={12} sm={6}>
        <Paper>
          <Accordion className={classes.paper3}>
            <AccordionSummary id='panelBreakdown-header' aria-controls='panelBreakdown-content'>
              <Typography variant='overline'>
                {'Breakdown'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <BreakdownComponent {...props} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid key={'values'} item xs={12} sm={6}>
        <Paper>
          <Accordion className={classes.paper4}>
            <AccordionSummary id='panelValues-header' aria-controls='panelValues-content'>
              <Typography variant='overline'>
                {'Values'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <ValuesComponent {...props} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid key={'partValues'} item xs={12} sm={6}>
        <Paper>
          <Accordion className={classes.paper5}>
            <AccordionSummary id='panelPartValues-header' aria-controls='panelPartValues-content'>
              <Typography variant='overline'>
                {'Case/Pickup Values'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <PartValuesComponent {...props} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid key={'cases'} item xs={12} sm={6}>
        <Paper>
          <Accordion className={classes.paper6}>
            <AccordionSummary id='panelMissingCase-header' aria-controls='panelMissingCase-content'>
              <Typography variant='overline'>
                {'Missing Cases'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <MissingCasesComponent {...props} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid key={'pickups'} item xs={12} sm={6}>
        <Paper>
          <Accordion className={classes.paper7}>
            <AccordionSummary id='panelPickups-header' aria-controls='panelPickups-content'>
              <Typography variant='overline'>
                {'Pickups'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <PickupsComponent {...props} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid key={'strings'} item xs={12} sm={6}>
        <Paper>
          <Accordion className={classes.paper8}>
            <AccordionSummary id='panelStrings-header' aria-controls='panelStrings-content'>
              <Typography variant='overline'>
                {'Strings'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <StringsComponent {...props} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid key={'timeline'} item xs={12} sm={6}>
        <Paper>
          <Accordion className={classes.paper9}>
            <AccordionSummary id='panelTimeline-header' aria-controls='panelTimeline-content'>
              <Typography variant='overline'>
                {'Timeline'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <TimelineComponent {...props} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid key={'construction'} item xs={12} sm={6}>
        <Paper>
          <Accordion className={classes.paper10}>
            <AccordionSummary id='panelConstruction-header' aria-controls='panelConstruction-content'>
              <Typography variant='overline'>
                {'Construction'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <ConstructionComponent {...props} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid key={'inProgress'} item xs={12} sm={6}>
        <Paper>
          <Accordion className={classes.paper11}>
            <AccordionSummary id='panelProjects-header' aria-controls='panelProjects-content'>
              <Typography variant='overline'>
                {'In Progress Projects'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <ProjectInProgressComponent {...props} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <div>
      {isMobile ? mobileGrid : desktopGrid}
    </div>
  );
};

export default Summary;
