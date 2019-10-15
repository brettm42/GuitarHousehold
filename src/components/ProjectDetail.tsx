import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CaseDetail from './CaseDetail';
import PickupDetail from './PickupDetail';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Project } from '../interfaces/models/project';
import * as GuitarUtils from '../data/guitarservice/utils';

type ProjectDetailProps = {
  item: Project
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
  item: guitar,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root} spacing={3}>
        <Grid item zeroMinWidth xs={12} sm>
          <Typography variant='h4' gutterBottom>
            {guitar.name}
          </Typography>

          <div>
            {[
              GuitarUtils.summarizeGuitar(guitar),
              guitar.description,
              guitar.series
                ? `Series: ${guitar.series}`
                : null,
              `Project Started: ${guitar.projectStart}`,
              `Project Completed: ${guitar.projectComplete}`,
              `Body: ${guitar.body}${guitar.purchaseStore ? ` (from ${guitar.purchaseStore})` : ''}`,
              `Body Style: ${guitar.bodyStyle}`,
              `Color: ${guitar.color}`,
              GuitarUtils.hasPurchasePrice(guitar)
                ? `Project cost: \$${GuitarUtils.getGuitarCost(guitar)}`
                : null,
              `Neck: ${guitar.neck}`,
              `s/n: ${guitar.serialNumber} (location: ${guitar.serialNumberLocation})`,
              guitar.pickguard
                ? `Pickguard: ${guitar.pickguard}`
                : null,
              `Strings: ${guitar.strings}`,
              guitar.numberOfStrings
                ? `Number of Strings: ${guitar.numberOfStrings}`
                : null,
              guitar.scale
                ? `Neck Scale: ${guitar.scale}`
                : null,
              guitar.numberOfFrets
                ? `Number of Frets: ${guitar.numberOfFrets}`
                : null,
              `Tuning: ${guitar.tuning ? guitar.tuning : 'Standard'}`,
              guitar.tremolo
                ? `Tremolo: ${guitar.tremolo}`
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
        {guitar.pickups && GuitarUtils.hasPickups(guitar)
          ? <div>
              <p>Pickups:</p>
              <ul>
                {guitar.pickups.map(i => 
                  <li key={i.id}>
                    <PickupDetail item={i} />
                  </li>)}
              </ul>
            </div>
          : null}
        {GuitarUtils.hasCase(guitar)
          ? <div>
              <p>Case:</p>
              <ul>
                {guitar.case 
                  ? <li key={guitar.case.id}>
                      <CaseDetail item={guitar.case} />
                    </li> 
                  : null}
              </ul>
            </div>
          : null}
        {guitar.modifications && GuitarUtils.hasModifications(guitar)
          ? <div className={classes.description}>
              <p>Modifications:</p>
              <ul>
                {guitar.modifications.map(i => 
                  <li key={i.length}>
                    <Typography>
                      {i}
                    </Typography>
                  </li>)}
              </ul>
            </div>
          : null}
        {guitar.controls && GuitarUtils.hasControls(guitar)
          ? <div className={classes.description}>
              <p>Controls:</p>
              <ul>
                {guitar.controls.map(i => 
                  <li key={i.length}>
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
