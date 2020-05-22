import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Guitar } from '../../interfaces/models/guitar';
import { Strings } from '../../interfaces/models/strings';
import { getStringAge } from '../../data/guitarservice/guitarutils';

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
        <Grid item zeroMinWidth xs sm={6}>
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
                ? `Purchased ${strings.purchaseDate}`
                : null,
              strings.purchaseStore
                ? `Purchase Store: ${strings.purchaseStore}`
                : null,
              strings.deliveryDate
                ? `Delivery Date: ${strings.deliveryDate}`
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

        <Grid item className={isMobile ? classes.jsonExpanderMobile : classes.jsonExpander} xs zeroMinWidth>
          <ExpansionPanel>
            <ExpansionPanelSummary id='stringsPanelJson-header' aria-controls='stringsPanelJson-content'>
              <Typography className={classes.heading}>Strings JSON Data</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={isMobile ? classes.jsonMobile : classes.json}>
                <Divider />
                <Typography variant='subtitle1'>
                  <pre>{JSON.stringify(strings, undefined, 2)}</pre>
                </Typography>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default StringsDetail;
