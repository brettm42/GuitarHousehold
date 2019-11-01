import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  BreakdownComponent,
  MissingCasesComponent, 
  MostCommonComponent, 
  OutliersComponent, 
  PickupsComponent,
  RandomPickComponent,
  TimelineComponent,
  ValuesComponent
} from './SummaryComponents';

import { Guitar } from '../interfaces/models/guitar';

type SummaryProps = {
  data: Guitar[]
  isMobile: boolean
}

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
  height: '100%'
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      alignItems: 'stretch',
      padding: theme.spacing(2)
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
      background: gridColors[4]
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

  const mostCommonComponent = (<MostCommonComponent data={guitars} isMobile={isMobile} />);
  const outliersComponent = (<OutliersComponent data={guitars} isMobile={isMobile} />);
  const randomPickComponent = (<RandomPickComponent data={guitars} isMobile={isMobile} />);
  const breakdownComponent = (<BreakdownComponent data={guitars} isMobile={isMobile} />);
  const valuesComponent = (<ValuesComponent data={guitars} isMobile={isMobile} />);
  const missingCasesComponent = (<MissingCasesComponent data={guitars} isMobile={isMobile} />);
  const pickupsComponent = (<PickupsComponent data={guitars} isMobile={isMobile} />);
  const timelineComponent = (<TimelineComponent data={guitars} isMobile={isMobile} />);

  const desktopGrid = (
    <Grid container 
      className={classes.root}
      justify='flex-start' 
      spacing={2}
    >
      <Grid key={'popular'} item xs={6} sm={4}>
        <Paper className={classes.paper0}>
          {mostCommonComponent}
        </Paper>
      </Grid>
      <Grid key={'outliers'} item xs={6} sm={4}>
        <Paper className={classes.paper1}>
          {outliersComponent}
        </Paper>
      </Grid>
      <Grid key={'randomPick'} item xs={6} sm={4}>
        <Paper className={classes.paper2}>
          {randomPickComponent}
        </Paper>
      </Grid>
      <Grid key={'breakdown'} item xs={6} sm={4}>
        <Paper className={classes.paper3}>
          {breakdownComponent}
        </Paper>
      </Grid> 
      <Grid key={'values'} item xs={6} sm={4}>
        <Paper className={classes.paper4}>
          {valuesComponent}
        </Paper>
      </Grid>            
      <Grid key={'cases'} item xs={6} sm={4}>
        <Paper className={classes.paper5}>
          {missingCasesComponent}
        </Paper>
      </Grid>
      <Grid key={'pickups'} item xs={6} sm={4}>
        <Paper className={classes.paper6}>
          {pickupsComponent}
        </Paper>
      </Grid>
      <Grid key={'timeline'} item xs={6} sm={4}>
        <Paper className={classes.paper7}>
          {timelineComponent}
        </Paper>
      </Grid>
    </Grid>
  );
  
  const mobileGrid = (
    <Grid container 
      className={classes.root} 
      justify='space-between' 
      direction='column'
      spacing={2}
    >
      <Grid key={'popular'} item xs={12} sm={6}>
        <Paper>
          <ExpansionPanel className={classes.paper0}>
            <ExpansionPanelSummary id='panelMostCommon-header' aria-controls='panelMostCommon-content'>
              <Typography variant='overline'>
                Most Common
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Divider />
              {mostCommonComponent}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </Grid>
      <Grid key={'outliers'} item xs={12} sm={6}>
        <Paper>
          <ExpansionPanel className={classes.paper1}>
            <ExpansionPanelSummary id='panelOutliers-header' aria-controls='panelOutliers-content'>
              <Typography variant='overline'>
                Outliers
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Divider />
              {outliersComponent}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </Grid>
      <Grid key={'randomPick'} item xs={12} sm={6}>
        <Paper>
          <ExpansionPanel className={classes.paper2}>
            <ExpansionPanelSummary id='panelRandom-header' aria-controls='panelRandom-content'>
              <Typography variant='overline'>
                Random Pick
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Divider />
              {randomPickComponent}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </Grid>
      <Grid key={'breakdown'} item xs={12} sm={6}>
        <Paper>
          <ExpansionPanel className={classes.paper3}>
            <ExpansionPanelSummary id='panelBreakdown-header' aria-controls='panelBreakdown-content'>
              <Typography variant='overline'>
                Breakdown
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Divider />
              {breakdownComponent}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </Grid> 
      <Grid key={'values'} item xs={12} sm={6}>
        <Paper>
          <ExpansionPanel className={classes.paper4}>
            <ExpansionPanelSummary id='panelValues-header' aria-controls='panelValues-content'>
              <Typography variant='overline'>
                Values
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Divider />
              {valuesComponent}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </Grid>            
      <Grid key={'cases'} item xs={12} sm={6}>
        <Paper>
          <ExpansionPanel className={classes.paper5}>
            <ExpansionPanelSummary id='panelMissingCase-header' aria-controls='panelMissingCase-content'>
              <Typography variant='overline'>
                Missing Cases
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Divider />
              {missingCasesComponent}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </Grid>
      <Grid key={'pickups'} item xs={12} sm={6}>
        <Paper>
          <ExpansionPanel className={classes.paper6}>
            <ExpansionPanelSummary id='panelPickups-header' aria-controls='panelPickups-content'>
              <Typography variant='overline'>
                Pickups
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Divider />              
              {pickupsComponent}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </Grid>
      <Grid key={'timeline'} item xs={12} sm={6}>
        <Paper>
          <ExpansionPanel className={classes.paper7}>
            <ExpansionPanelSummary id='panelTimeline-header' aria-controls='panelTimeline-content'>
              <Typography variant='overline'>
                Timeline
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Divider />              
              {timelineComponent}
            </ExpansionPanelDetails>
          </ExpansionPanel>
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
