import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { 
  getDeliveryTime,
  isDelivered, 
  isFactoryPickup 
} from '../../data/guitarservice/guitarutils';
import { Pickup } from '../../interfaces/models/pickup';

type PickupDetailProps = {
  item: Pickup;
  isMobile: boolean;
};

const useStyles = makeStyles()((theme: Theme) => {
  return {
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
  };
});

const PickupDetail: React.FunctionComponent<PickupDetailProps> = ({
  item: pickup, isMobile
}) => {
  const { classes } = useStyles();

  const pickupDetails = 
    [
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
      pickup.magnetType
        ? `Magnet Type: ${pickup.magnetType}`
        : null,
      pickup.cover
        ? `Cover: ${pickup.cover}`
        : null,
      pickup.purchaseDate
        ? `Purchased: ${pickup.purchaseDate}`
        : null,
      pickup.purchasePrice
        ? `Purchase Price: \$${pickup.purchasePrice}`
        : null,
      pickup.purchaseStore
        ? `Purchase Store: ${pickup.purchaseStore}`
        : null,
      pickup.deliveryDate
        ? `Delivered: ${isDelivered(pickup) 
          ? `${pickup.deliveryDate} (${getDeliveryTime(pickup)})`
          : 'not yet delivered'}`
        : null,
    ];

  return (
    <div>
      <Grid container className={classes.root} spacing={3} direction={isMobile ? 'column' : 'row'}>
        <Grid item zeroMinWidth xs={12} sm={6}>
          <Typography variant='h6' gutterBottom>
            {pickup.name}
          </Typography>

          {pickup.description
            ? <Typography className={classes.summary} variant='subtitle2' gutterBottom>
                {pickup.description}
              </Typography>
            : null}

          <div>
            {pickupDetails
              .map((text, idx) => (
                <Typography key={idx} gutterBottom>
                  {text}
                </Typography>
              ))}

            {pickup.productUrl
              ? <Typography key={`${pickup.id}-link`} gutterBottom>
                  Product Link: <a target={isMobile ? '' : '_blank'} href={pickup.productUrl}>{pickup.productUrl}</a>
                </Typography>
              : null}
          </div>
        </Grid>

        <Grid item zeroMinWidth xs={12} sm={6}
            className={isMobile ? classes.jsonExpanderMobile : classes.jsonExpander}>
          <Accordion>
            <AccordionSummary id='pickupPanelJson-header' aria-controls='pickupPanelJson-content'>
              <Typography className={classes.heading}>Pickup JSON Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={isMobile ? classes.jsonMobile : classes.json}>
                <Divider />
                <Typography variant='subtitle1'>
                  <pre>{JSON.stringify(pickup, undefined, 2)}</pre>
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default PickupDetail;
