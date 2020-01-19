import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CaseDetail from './CaseDetail';
import PickupDetail from './PickupDetail';
import StringsDetail from './StringsDetail';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Project } from '../../interfaces/models/project';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';

type ProjectDetailProps = {
  item: Project;
  isMobile: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      padding: theme.spacing(2)
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    description: {
      maxWidth: 500
    },
    summary: {
      paddingBottom: theme.spacing(2)
    },
    img: {
      width: '100%',
      marginLeft: theme.spacing(3)
    },
    imgMobile: {
      width: '100%'
    },
    jsonExpander: {
      margin: theme.spacing(6, 4, 0, 4)
    },
    json: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    jsonExpanderMobile: {
      margin: theme.spacing(6, 0, 0, 0)
    },
    jsonMobile: {
      whiteSpace: 'nowrap',
      overflowY: 'hidden',
      overflowX: 'scroll'
    }
  })
);

const ProjectDetail: React.FunctionComponent<ProjectDetailProps> = ({
  item: guitar, isMobile
}) => {
  const classes = useStyles();

  const projectSummary = (
    <div>
      {guitar.description
        ? <div>
            <Typography variant='subtitle2' gutterBottom>
              {GuitarUtils.summarizeGuitar(guitar)}
            </Typography>
            <Typography className={classes.summary} variant='subtitle2' gutterBottom>
              {guitar.description}
            </Typography>
          </div>
        : <Typography className={classes.summary} variant='subtitle2' gutterBottom>
            {GuitarUtils.summarizeGuitar(guitar)}
          </Typography>
      }
    </div>
  );

  return (
    <div>
      <Grid container className={classes.root} spacing={3} direction={isMobile ? 'column' : 'row'}>
        <Grid item zeroMinWidth xs={12} sm>
          <Typography variant='h4' gutterBottom>
            {(guitar.name + (GuitarUtils.isInProgress(guitar) ? ' (In\u00A0Progress)' : ''))}
          </Typography>

          {projectSummary}

          <div>
            {[
              guitar.series
                ? `Series: ${guitar.series}`
                : null,
              `Project Started: ${guitar.projectStart}`,
              guitar.projectComplete
                ? `Project Completed: ${guitar.projectComplete}`
                : null,
              guitar.body
                ? `Body: ${guitar.body}${guitar.purchaseStore ? ` (from ${guitar.purchaseStore})` : ''}`
                : null,
              guitar.bodyStyle
                ? `Body Style: ${guitar.bodyStyle}`
                : null,
              `Color: ${guitar.color}`,
              GuitarUtils.hasPurchasePrice(guitar)
                ? `Project Cost: \$${GuitarUtils.getGuitarCost(guitar)}`
                : null,
              guitar.neck
                ? `Neck: ${guitar.neck}`
                : null,
              guitar.serialNumber 
                ? `s/n: ${guitar.serialNumber} (location: ${guitar.serialNumberLocation})` 
                : null,
              guitar.pickguard
                ? `Pickguard: ${guitar.pickguard}`
                : null,
              guitar.scale
                ? `Neck Scale: ${guitar.scale}`
                : null,
              guitar.numberOfFrets
                ? `Number of Frets: ${guitar.numberOfFrets}`
                : null,
              guitar.neckRadius
                ? `Neck Radius: ${guitar.neckRadius}`
                : null,
              guitar.nutWidth
                ? `Nut Width: ${guitar.nutWidth}`
                : null,
              `Tuning: ${guitar.tuning ? guitar.tuning : 'Standard'}`,
              guitar.tremolo
                ? `Tremolo: ${guitar.tremolo}`
                : null,
              guitar.hasBattery
                ? `Has Battery: Yes`
                : null,
              guitar.productUrl
                ? `Product Link: ${guitar.productUrl}`
                : null
            ]
            .map((text, idx) => (
              <Typography key={idx} gutterBottom>
                {text}
              </Typography>
            ))}
          </div>
        </Grid>

        <Grid item zeroMinWidth xs={12} sm={6}>
          {guitar.picture
            ? <img className={isMobile ? classes.imgMobile : classes.img} src={guitar.picture} alt={guitar.name} />
            : null}
        </Grid>
      </Grid>

      <Divider variant='middle' />

      <Typography variant='h5'>
        {GuitarUtils.hasPickups(guitar)
          ? <div>
              <p>Pickups:</p>
              <ul>
                {(guitar.pickups ?? []).map(i =>
                  <li key={i.id}>
                    <PickupDetail item={i} isMobile={isMobile} />
                  </li>)}
              </ul>
            </div>
          : null}
        {guitar.strings
          ? <div>
              <p>Strings:</p>
              <ul>
                <li key={guitar.strings.id}>
                  <StringsDetail item={guitar.strings} parent={guitar} isMobile={isMobile} />
                </li>
              </ul>
            </div>
          : null}
        {GuitarUtils.hasCase(guitar)
          ? <div>
              <p>Case:</p>
              <ul>
                {guitar.case
                  ? <li key={guitar.case.id}>
                      <CaseDetail item={guitar.case} isMobile={isMobile} />
                    </li>
                  : null}
              </ul>
            </div>
          : null}
        {GuitarUtils.hasModifications(guitar)
          ? <div className={classes.description}>
              <p>Modifications:</p>
              <ul>
                {(guitar.modifications ?? []).map((i, idx) =>
                  <li key={idx}>
                    <Typography>
                      {i}
                    </Typography>
                  </li>)}
              </ul>
            </div>
          : null}
        {GuitarUtils.hasControls(guitar)
          ? <div className={classes.description}>
              <p>Controls:</p>
              <ul>
                {(guitar.controls ?? []).map((i, idx) =>
                  <li key={idx}>
                    <Typography>
                      {i}
                    </Typography>
                  </li>)}
              </ul>
            </div>
          : null}
      </Typography>

      <ExpansionPanel className={isMobile ? classes.jsonExpanderMobile : classes.jsonExpander}>
        <ExpansionPanelSummary id='projectPanelJson-header' aria-controls='projectPanelJson-content'>
          <Typography className={classes.heading}>Guitar JSON Data</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={isMobile ? classes.jsonMobile : classes.json}>
            <Divider />
            <Typography variant='subtitle1'>
              <pre>{JSON.stringify(guitar, undefined, 2)}</pre>
            </Typography>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default ProjectDetail;
