import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Pickup } from '../../interfaces/models/pickup';
import { isFactoryPickup } from '../../data/guitarservice/guitarutils';

type PickupDetailProps = {
  item: Pickup;
  isMobile: boolean;
};

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
    },
    jsonExpanderMobile: {
      margin: 0
    },
    jsonMobile: {
      whiteSpace: 'nowrap',
      overflowY: 'hidden',
      overflowX: 'scroll'
    }
  })
);

const PickupDetail: React.FunctionComponent<PickupDetailProps> = ({
  item: pickup, isMobile
}) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root} spacing={3} direction={isMobile ? 'column' : 'row'}>
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
              isFactoryPickup(pickup)
                ? 'Factory Pickup'
                : null,
              pickup.position
                ? `Position: ${pickup.position}`
                : null,
              `Type: ${pickup.type}${pickup.size ? ' (' + pickup.size + ' size)' : ''}`,
              pickup.mount
                ? `Mount: ${pickup.mount}`
                : null,
              pickup.output
                ? `Output: ${pickup.output}`
                : null,
              pickup.purchaseDate
                ? `Purchase Date: ${pickup.purchaseDate}`
                : null,
              pickup.purchasePrice
                ? `Purchase Price: \$${pickup.purchasePrice}`
                : null,
              pickup.purchaseStore
                ? `Purchase Store: ${pickup.purchaseStore}`
                : null
              ]
              .map((text, idx) => (
                <Typography key={idx} gutterBottom>
                  {text}
                </Typography>
              ))}

            {pickup.productUrl
              ? <Typography key={`${pickup.id}-link`} gutterBottom>
                  Product Link: <a href={pickup.productUrl}>{pickup.productUrl}</a>
                </Typography>
              : null}
          </div>
        </Grid>

        <Grid item className={isMobile ? classes.jsonExpanderMobile : classes.jsonExpander} xs zeroMinWidth>
          <ExpansionPanel>
            <ExpansionPanelSummary id='pickupPanelJson-header' aria-controls='pickupPanelJson-content'>
              <Typography className={classes.heading}>Pickup JSON Data</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={isMobile ? classes.jsonMobile : classes.json}>
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
