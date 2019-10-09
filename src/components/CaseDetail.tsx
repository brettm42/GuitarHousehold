import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Case } from '../interfaces/models/case';

type CaseDetailProps = {
  item: Case
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
    jsonExpander: {
      marginLeft: 'auto',
      marginRight: 0
    },
    json: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: 400
    }
  })
);

const CaseDetail: React.FunctionComponent<CaseDetailProps> = ({
  item: guitarCase,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root} spacing={3}>
        <Grid item>
          <Typography variant='h6' gutterBottom>
            {guitarCase.name}
          </Typography>

          <div>
            {[
              guitarCase.description,
              `Case Style: ${guitarCase.caseStyle}`,
              guitarCase.purchaseDate 
                ? `Purchased ${guitarCase.purchaseDate}`
                : null,
              `Purchase Store: ${guitarCase.purchaseStore}`,
              guitarCase.purchasePrice
                  ? `Purchase price: \$${guitarCase.purchasePrice}`
                  : null,
              guitarCase.productUrl
                ? `Product Link: <a href=${guitarCase.productUrl}>${guitarCase.productUrl}</a>`
                : null
            ]
            .map((text, idx) => (
              <Typography key={idx} gutterBottom>
                {text}
              </Typography>
            ))}
          </div>
        </Grid>

        <Grid item className={classes.jsonExpander}>
          <ExpansionPanel>
            <ExpansionPanelSummary aria-controls='panelJson-content' id='panelJson-header'>
              <Typography className={classes.heading}>Case JSON Data</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.json}>
                <Divider />
                <Typography variant='subtitle1'>
                  <pre>{JSON.stringify(guitarCase, undefined, 2)}</pre>
                </Typography>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default CaseDetail;
