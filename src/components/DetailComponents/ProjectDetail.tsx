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
  item: Project
  isMobile: boolean
}

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
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 0
    },
    jsonExpander: {
      margin: theme.spacing(2, 4)
    },
    json: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
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
            {guitar.name}
          </Typography>

          {projectSummary}

          <div>
            {[
              guitar.series
                ? `Series: ${guitar.series}`
                : null,
              `Project Started: ${guitar.projectStart}`,
              `Project Completed: ${guitar.projectComplete ?? 'In Progress'}`,
              `Body: ${guitar.body}${guitar.purchaseStore ? ` (from ${guitar.purchaseStore})` : ''}`,
              `Body Style: ${guitar.bodyStyle}`,
              `Color: ${guitar.color}`,
              GuitarUtils.hasPurchasePrice(guitar)
                ? `Project Cost: \$${GuitarUtils.getGuitarCost(guitar)}`
                : null,
              guitar.neck
                ? `Neck: ${guitar.neck}`
                : null,
              `s/n: ${guitar.serialNumber ? `${guitar.serialNumber} (location: ${guitar.serialNumberLocation})` : 'None'}`,
              guitar.pickguard
                ? `Pickguard: ${guitar.pickguard}`
                : null,
              guitar.scale
                ? `Neck Scale: ${guitar.scale}`
                : null,
              guitar.numberOfFrets
                ? `Number of Frets: ${guitar.numberOfFrets}`
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
            ? <img className={classes.img} src={guitar.picture} alt={guitar.name} />
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
      
      <ExpansionPanel className={classes.jsonExpander}>
        <ExpansionPanelSummary id='projectPanelJson-header' aria-controls='projectPanelJson-content'>
          <Typography className={classes.heading}>Guitar JSON Data</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.json}>
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
