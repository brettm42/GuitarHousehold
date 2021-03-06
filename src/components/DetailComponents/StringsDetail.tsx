import * as React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { getDeliveryTime, getStringAge, isDelivered } from '../../data/guitarservice/guitarutils';

import { Guitar } from '../../interfaces/models/guitar';
import { Strings } from '../../interfaces/models/strings';

type StringsDetailProps = {
  item: Strings;
  parent: Guitar;
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

const StringsDetail: React.FunctionComponent<StringsDetailProps> = ({
  item: strings, parent: guitar, isMobile
}) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root} spacing={3} direction={isMobile ? 'column' : 'row'}>
        <Grid item zeroMinWidth xs={12} sm={6}>
          <Typography variant='h6' gutterBottom>
            {strings.name}
          </Typography>

          {strings.description
            ? <Typography className={classes.summary} variant='subtitle2' gutterBottom>
                {strings.description}
              </Typography>
            : null}

          <div>
            {[
              strings.gauge
                ? `Gauge: ${strings.gauge}`
                : null,
              strings.material
                ? `Material: ${strings.material}`
                : null,
              strings.numberOfStrings
                ? `Number of Strings: ${strings.numberOfStrings}`
                : null,
              strings
                ? `String Age: ${getStringAge(guitar)}`
                : null,
              strings.lastChangeDate
                ? `Last Time Changed: ${strings.lastChangeDate}`
                : null,
              strings.purchaseDate
                ? `Purchased: ${strings.purchaseDate}`
                : null,
              strings.purchaseStore
                ? `Purchase Store: ${strings.purchaseStore}`
                : null,
              strings.deliveryDate
                ? `Delivered: ${isDelivered(strings) 
                  ? `${strings.deliveryDate} (${getDeliveryTime(strings)})`
                  : 'not yet delivered'}`
                : null,
              strings.purchasePrice
                ? `Purchase Price: \$${strings.purchasePrice}`
                : null
              ]
              .map((text, idx) => (
                <Typography key={idx} gutterBottom>
                  {text}
                </Typography>
              ))}
            
            {strings.productUrl
              ? <Typography key={`${strings.id}-link`} gutterBottom>
                  Product Link: <a href={strings.productUrl}>{strings.productUrl}</a>
                </Typography>
              : null}
          </div>
        </Grid>

        <Grid item zeroMinWidth xs={12} sm={6}
            className={isMobile ? classes.jsonExpanderMobile : classes.jsonExpander}>
          <Accordion>
            <AccordionSummary id='stringsPanelJson-header' aria-controls='stringsPanelJson-content'>
              <Typography className={classes.heading}>Strings JSON Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={isMobile ? classes.jsonMobile : classes.json}>
                <Divider />
                <Typography variant='subtitle1'>
                  <pre>{JSON.stringify(strings, undefined, 2)}</pre>
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default StringsDetail;
