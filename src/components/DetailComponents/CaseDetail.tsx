import * as React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { isDelivered } from '../../data/guitarservice/guitarutils';

import { Case } from '../../interfaces/models/case';

type CaseDetailProps = {
  item: Case;
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

const CaseDetail: React.FunctionComponent<CaseDetailProps> = ({
  item: guitarCase, isMobile
}) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root} spacing={3} direction={isMobile ? 'column' : 'row'}>
        <Grid item zeroMinWidth xs sm={6}>
          <Typography variant='h6' gutterBottom>
            {guitarCase.name}
          </Typography>

          {guitarCase.description
            ? <Typography className={classes.summary} variant='subtitle2' gutterBottom>
                {guitarCase.description}
              </Typography>
            : null}

          <div>
            {[
              `Case Style: ${guitarCase.caseStyle}`,
              guitarCase.purchaseDate
                ? `Purchased: ${guitarCase.purchaseDate}`
                : null,
              guitarCase.purchaseStore
                ? `Purchase Store: ${guitarCase.purchaseStore}`
                : null,
              guitarCase.deliveryDate
                ? `Delivered: ${isDelivered(guitarCase) ? guitarCase.deliveryDate : 'not yet delivered'}`
                : null,
              guitarCase.purchasePrice
                ? `Purchase Price: \$${guitarCase.purchasePrice}`
                : null
              ]
              .map((text, idx) => (
                <Typography key={idx} gutterBottom>
                  {text}
                </Typography>
              ))}

            {guitarCase.productUrl
              ? <Typography key={`${guitarCase.id}-link`} gutterBottom>
                  Product Link: <a href={guitarCase.productUrl}>{guitarCase.productUrl}</a>
                </Typography>
              : null}
          </div>
        </Grid>

        <Grid item className={isMobile ? classes.jsonExpanderMobile : classes.jsonExpander} xs zeroMinWidth>
          <Accordion>
            <AccordionSummary id='casePanelJson-header' aria-controls='casePanelJson-content'>
              <Typography className={classes.heading}>Case JSON Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={isMobile ? classes.jsonMobile : classes.json}>
                <Divider />
                <Typography variant='subtitle1'>
                  <pre>{JSON.stringify(guitarCase, undefined, 2)}</pre>
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default CaseDetail;
