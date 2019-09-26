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

import { Guitar } from '../interfaces/models/guitar';
import * as GuitarUtils from '../data/guitarservice/utils';

type GuitarDetailProps = {
  item: Guitar
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    paper: {
      padding: 15,
      minHeight: 220,
      width: 500,
    },
    control: {
      padding: theme.spacing(2),
    },
    img: {
      maxWidth: 500,
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
      textOverflow: 'ellipsis',
    }
  })
);

const GuitarDetail: React.FunctionComponent<GuitarDetailProps> = ({
  item: guitar,
}) => {
  const classes = useStyles();
  
  return (
    <div>
      <Grid container className={classes.root} spacing={3}>
        <Grid item>
          <Typography variant='h4' gutterBottom>
            {guitar.name}
          </Typography>

          <Typography>
            {guitar.description
              ? <p>{guitar.description}</p>
              : null}
            <p>Make: {guitar.make}</p>
            <p>Model: {guitar.model}</p>
            {guitar.series
              ? <p>Series: {guitar.series}</p>
              : null}
            <p>Body Style: {guitar.bodyStyle}</p>
            <p>Color: {guitar.color}</p>
            <p>s/n: {guitar.serialNumber} (location: {guitar.serialNumberLocation})</p>
            <p>Purchased {guitar.purchaseDate} from {guitar.purchaseStore}</p>
            {guitar.purchasePrice
              ? <p>Purchase price: ${guitar.purchasePrice}</p>
              : null}
            <p>Strings: {guitar.strings}</p>
            {guitar.scale
              ? <p>Neck Scale: {guitar.scale}</p>
              : null}
            <p>Tuning: {guitar.tuning ? guitar.tuning : 'Standard'}</p>
            {guitar.productUrl
              ? <p>Product Link: <a href={guitar.productUrl}>{guitar.productUrl}</a></p>
              : null}
          </Typography>
        </Grid>

        <Grid item>
          {guitar.picture
            ? <img className={classes.img} src={guitar.picture} alt={guitar.name} />
            : null}
        </Grid>
      </Grid>

      <Divider variant='middle'/>
      <Typography variant='h5'>
        {guitar.pickups && GuitarUtils.hasPickups(guitar)
          ? <div><p>Pickups:</p>
            <ul>{guitar.pickups.map(i => <li key={i.id}><PickupDetail item={i} /></li>)}</ul></div>
          : null}
        {GuitarUtils.hasCase(guitar)
          ? <div><p>Case:</p>
            <ul>{guitar.case ? <li key={guitar.case.id}><CaseDetail item={guitar.case} /></li> : null}</ul></div>
          : null}
        {guitar.modifications && GuitarUtils.hasModifications(guitar)
          ? <div>
              <p>Modifications:</p>
              <Typography>
                <ul>{guitar.modifications.map(i => <li key={i.length}>{i}</li>)}</ul>
              </Typography>  
            </div>
          : null}
      </Typography>

      <ExpansionPanel className={classes.jsonExpander}>
        <ExpansionPanelSummary aria-controls="panelJson-content" id="panelJson-header">
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
