import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CaseDetail from './CaseDetail';
import PickupDetail from './PickupDetail';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IsMobile } from '../viewutils';

import { Guitar } from '../../interfaces/models/guitar';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';

type GuitarDetailProps = {
  item: Guitar
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

const GuitarDetail: React.FunctionComponent<GuitarDetailProps> = ({
  item: guitar,
}) => {
  const classes = useStyles();
  
  const guitarSummary = (
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
      <Grid container className={classes.root} spacing={3} direction={IsMobile() ? 'column' : 'row'}>
        <Grid item zeroMinWidth xs={12} sm>
          <Typography variant='h4' gutterBottom>
            {guitar.name}
          </Typography>

          {guitarSummary}

          <div>
            {[
              `Make: ${guitar.make}`,
              `Model: ${guitar.model}`,
              guitar.series
                ? `Series: ${guitar.series}`
                : null,
              `Body Style: ${guitar.bodyStyle}`,
              `Color: ${guitar.color}`,
              `s/n: ${guitar.serialNumber ? guitar.serialNumber : 'None'} (location: ${guitar.serialNumberLocation})`,
              `Purchased ${guitar.purchaseDate} from ${guitar.purchaseStore}`,
              GuitarUtils.hasPurchasePrice(guitar)
                ? `Purchase price: \$${GuitarUtils.getGuitarCost(guitar)}`
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

      <Divider variant='middle'/>
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
                {guitar.modifications.map((i, idx) => 
                  <li key={idx}>
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
                {guitar.controls.map((i, idx) => 
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
        <ExpansionPanelSummary id='guitarPanelJson-header' aria-controls='guitarPanelJson-content'>
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

export default GuitarDetail;
