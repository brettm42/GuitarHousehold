import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { getDeliveryTime, isDelivered, isFactoryCase } from '../../data/guitarservice/guitarutils';
import { Case } from '../../interfaces/models/case';

type CaseDetailProps = {
  item: Case;
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

const CaseDetail: React.FunctionComponent<CaseDetailProps> = ({
  item: guitarCase, isMobile
}) => {
  const { classes } = useStyles();

  return (
    <div>
      <Grid container className={classes.root} spacing={3} direction={isMobile ? 'column' : 'row'}>
        <Grid item zeroMinWidth xs={12} sm={6}>
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
              guitarCase.caseStyle
                ? `Case Style: ${guitarCase.caseStyle}`
                : null,
              guitarCase.purchaseDate
                ? `Purchased: ${guitarCase.purchaseDate}`
                : null,
              guitarCase.purchaseStore
                ? `Purchase Store: ${guitarCase.purchaseStore}`
                : null,
              guitarCase.deliveryDate
                ? `Delivered: ${isDelivered(guitarCase)
                  ? `${guitarCase.deliveryDate} (${getDeliveryTime(guitarCase)})`
                  : 'not yet delivered'}`
                : null,
              guitarCase.purchasePrice
                ? `Purchase Price: \$${guitarCase.purchasePrice}`
                : null,
              isFactoryCase(guitarCase) 
                ? `Case came with guitar`
                : null
            ]
              .map((text, idx) => (
                <Typography key={idx} gutterBottom>
                  {text}
                </Typography>
              ))}

            {guitarCase.productUrl
              ? <Typography key={`${guitarCase.id}-link`} gutterBottom>
                  Product Link: <a target={isMobile ? '' : '_blank'} href={guitarCase.productUrl}>{guitarCase.productUrl}</a>
                </Typography>
              : null}
          </div>
        </Grid>

        <Grid item zeroMinWidth xs={12} sm={6}
            className={isMobile ? classes.jsonExpanderMobile : classes.jsonExpander}>
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
