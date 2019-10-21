import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Pickup } from '../../interfaces/models/pickup';

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
    summary: {
      paddingBottom: theme.spacing(2)
    },
    jsonExpander: {
      marginLeft: 'auto',
      marginRight: 0
    },
    json: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
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
        <Grid item zeroMinWidth xs sm={6}>
          <Typography variant='h6' gutterBottom>
            {pickup.name}
          </Typography>

          {pickup.description
            ? <Typography className={classes.summary} variant='subtitle2' gutterBottom>
                {pickup.description}
              </Typography>
            : null}

          <div>
            {[
              `Position: ${pickup.position}`,
              `Type: ${pickup.type}`,
              pickup.output 
                ? `Output: ${pickup.output}`
                : null,
              pickup.purchaseDate 
                ? `Purchase Date: ${pickup.purchaseDate}`
                : null,
              pickup.purchasePrice
                  ? `Purchase price: \$${pickup.purchasePrice}`
                  : null,
              pickup.purchaseStore 
                ? `Purchase Store: ${pickup.purchaseStore}`
                : null,
              pickup.productUrl
                ? `Product Link: ${pickup.productUrl}`
                : null
              ]
              .map((text, idx) => (
                <Typography key={idx} gutterBottom>
                  {text}
                </Typography>
              ))}
          </div>
        </Grid>

        <Grid item className={classes.jsonExpander} xs zeroMinWidth>
          <ExpansionPanel>
            <ExpansionPanelSummary id='pickupPanelJson-header' aria-controls='pickupPanelJson-content'>
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
