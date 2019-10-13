import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { IsMobile } from '../infrastructure/utils';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import {
  BreakdownComponent,
  MissingCasesComponent, 
  MostCommonComponent, 
  OutliersComponent, 
  PickupsComponent,
  RandomPickComponent,
  ValuesComponent
} from './SummaryComponents';

import { Guitar } from '../interfaces/models/guitar';

type SummaryProps = {
  data: Guitar[]
}

const gridPaperStyle = {
  padding: 1,
  alignSelf: 'stretch'
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(2)
    },
    paper0: {
      ...gridPaperStyle,
      background: 'lightblue'
    },
    paper1: {
      ...gridPaperStyle,
      background: 'lightgreen'
    },
    paper2: {
      ...gridPaperStyle,
      background: 'lightpink'
    },
    paper3: {
      ...gridPaperStyle,
      background: 'orange'
    },
    paper4: {
      ...gridPaperStyle,
      background: 'lightyellow'
    },
    paper5: {
      ...gridPaperStyle,
      background: 'lightgrey'
    },
    paper6: {
      ...gridPaperStyle,
      background: 'lavender'
    },
    control: {
      padding: theme.spacing(2),
    }
  })
);

const Summary: React.FunctionComponent<SummaryProps> = ({
  data: guitars
}) => {
  const classes = useStyles();

  const mostCommonComponent = (<MostCommonComponent data={guitars} />);
  const outliersComponent = (<OutliersComponent data={guitars} />);
  const randomPickComponent = (<RandomPickComponent data={guitars} />);
  const breakdownComponent = (<BreakdownComponent data={guitars} />);
  const valuesComponent = (<ValuesComponent data={guitars} />);
  const missingCasesComponent = (<MissingCasesComponent data={guitars} />);
  const pickupsComponent = (<PickupsComponent data={guitars} />);

  const desktopGrid = (
    <Grid container className={classes.root} justify='flex-start' spacing={2}>
      <Grid key={'popular'} item xs={6} sm={4}>
        <Paper className={classes.paper0}>
          {mostCommonComponent}
        </Paper>
      </Grid>
      <Grid key={'outliers'} item xs={6} sm={4}>
        <Paper className={classes.paper2}>
          {outliersComponent}
        </Paper>
      </Grid>
      <Grid key={'randomPick'} item xs={6} sm={4}>
        <Paper className={classes.paper5}>
          {randomPickComponent}
        </Paper>
      </Grid>
      <Grid key={'breakdown'} item xs={6} sm={4}>
        <Paper className={classes.paper6}>
          {breakdownComponent}
        </Paper>
      </Grid> 
      <Grid key={'values'} item xs={6} sm={4}>
        <Paper className={classes.paper3}>
          {valuesComponent}
        </Paper>
      </Grid>            
      <Grid key={'cases'} item xs={6} sm={4}>
        <Paper className={classes.paper1}>
          {missingCasesComponent}
        </Paper>
      </Grid>
      <Grid key={'pickups'} item xs={6} sm={4}>
        <Paper className={classes.paper4}>
          {pickupsComponent}
        </Paper>
      </Grid>
    </Grid>
  );
  
  const mobileGrid = (
    <Grid container className={classes.root} justify='space-between' spacing={2}>
      <Grid key={'popular'} item xs={12} sm={6}>
        <Paper>
          <ExpansionPanel className={classes.paper0}>
            <ExpansionPanelSummary>
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
          <ExpansionPanel className={classes.paper2}>
            <ExpansionPanelSummary>
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
          <ExpansionPanel className={classes.paper5}>
            <ExpansionPanelSummary>
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
          <ExpansionPanel className={classes.paper6}>
            <ExpansionPanelSummary>
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
          <ExpansionPanel className={classes.paper3}>
            <ExpansionPanelSummary>
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
          <ExpansionPanel className={classes.paper1}>
            <ExpansionPanelSummary>
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
          <ExpansionPanel className={classes.paper4}>
            <ExpansionPanelSummary>
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
    </Grid>
  );

  return (
    <div>
      {IsMobile() 
        ? mobileGrid
        : desktopGrid}
    </div>
  );
};

export default Summary;
