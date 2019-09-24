import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Pickup } from '../interfaces/models/pickup';

type PickupDetailProps = {
  item: Pickup
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
    json: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: 400
    }
  })
);

const PickupDetail: React.FunctionComponent<PickupDetailProps> = ({
  item: pickup,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root} spacing={3}>
        <Grid item>
          <Typography variant='h6' gutterBottom>
            {pickup.name}
          </Typography>

          <Typography>
            {pickup.description 
              ? <p>{pickup.description}</p> 
              : null}
            <p>Position: {pickup.position}</p>
            <p>Type: {pickup.type}</p>
            {pickup.output 
              ? <p>Output: {pickup.output}</p> 
              : null}
            {pickup.purchaseDate 
              ? <p>Purchase Date: {pickup.purchaseDate}</p> 
              : null}
              {pickup.purchasePrice
                ? <p>Purchase price: ${pickup.purchasePrice}</p>
                : null}
            {pickup.purchaseStore 
              ? <p>Purchase Store: {pickup.purchaseStore}</p> 
              : null}
            {pickup.productUrl
              ? <p>Product Link: <a href={pickup.productUrl}>{pickup.productUrl}</a></p>
              : null}
          </Typography>
        </Grid>

        <Grid item>
          <ExpansionPanel>
            <ExpansionPanelSummary aria-controls="panelJson-content" id="panelJson-header">
              <Typography className={classes.heading}>Pickup JSON Data</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.json}>
                <Divider />
                <Typography variant='subtitle1'>
                  <pre>{JSON.stringify(pickup, undefined, 2)}</pre>
                </Typography>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default PickupDetail;
