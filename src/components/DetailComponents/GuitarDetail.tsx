import * as React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CaseDetail from './CaseDetail';
import PickupDetail from './PickupDetail';
import StringsDetail from './StringsDetail';
import ImageComponent from '../ImageComponent';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Guitar } from '../../interfaces/models/guitar';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';

type GuitarDetailProps = {
  item: Guitar;
  isMobile: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      padding: theme.spacing(2)
    },
    title: {
      padding: theme.spacing(2, 0)
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    description: {
      maxWidth: 500
    },
    summary: {
      paddingBottom: theme.spacing(2)
    },
    json: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    jsonExpander: {
      margin: theme.spacing(6, 4, 0, 4)
    },
    jsonMobile: {
      whiteSpace: 'nowrap',
      overflowY: 'hidden',
      overflowX: 'scroll'
    },
    jsonExpanderMobile: {
      margin: theme.spacing(6, 0, 0, 0)
    }
  })
);

const GuitarDetail: React.FunctionComponent<GuitarDetailProps> = ({
  item: guitar, isMobile
}) => {
  const classes = useStyles();

  const guitarSummary = (
    <div>
      {guitar.description
        ? <div>
            <Typography variant='subtitle2' gutterBottom>
              {GuitarUtils.summarizeGuitar(guitar)}
            </Typography>
            <Typography className={classes.summary} variant='subtitle2' gutterBottom>
              {guitar.description}
            </Typography>
          </div>
        : <Typography className={classes.summary} variant='subtitle2' gutterBottom>
            {GuitarUtils.summarizeGuitar(guitar)}
          </Typography>
      }
    </div>
  );

  return (
    <div>
      <Grid container className={classes.root} spacing={3} direction={isMobile ? 'column' : 'row'}>
        <Grid item zeroMinWidth xs={12} sm>
          <div className={classes.title}>
            <Typography variant='h4' gutterBottom>
              {guitar.name}
            </Typography>
          </div>

          {guitarSummary}

          <div>
            {[
              guitar.make
                ? `Make: ${guitar.make}`
                : null,
              guitar.model
                ? `Model: ${guitar.model}`
                : null,
              guitar.series
                ? `Series: ${guitar.series}`
                : null,
              guitar.bodyStyle
                ? `Body Style: ${guitar.bodyStyle}`
                : null,
              `Color: ${guitar.color ?? 'Unfinished'}`,
              guitar.serialNumber 
                ? `s/n: ${guitar.serialNumber} (location: ${guitar.serialNumberLocation})` 
                : null,
              guitar.purchaseDate
                ? `Purchased: ${guitar.purchaseDate} from ${guitar.purchaseStore}`
                : null,
              guitar.deliveryDate != null
                ? `Delivered: ${GuitarUtils.isDelivered(guitar) ? guitar.deliveryDate : 'not yet delivered'}`
                : null,
              GuitarUtils.hasPurchasePrice(guitar)
                ? `Purchase Price: \$${guitar.purchasePrice}`
                : null,
              guitar.currentPrice
                ? `Cost Today: ${guitar.currentPrice}`
                : null,
              guitar.scale
                ? `Neck Scale: ${guitar.scale}`
                : null,
              guitar.numberOfFrets
                ? `Number of Frets: ${guitar.numberOfFrets}`
                : null,
              guitar.neckRadius
                ? `Neck Radius: ${guitar.neckRadius}`
                : null,
              guitar.nutWidth
                ? `Nut Width: ${guitar.nutWidth}`
                : null,
              guitar.neckBoltOn
                ? `Bolt-on Neck: Yes`
                : null,
              `Tuning: ${guitar.tuning ? guitar.tuning : 'Standard'}`,
              guitar.tremolo
                ? `Tremolo: ${guitar.tremolo}`
                : null,
              guitar.hasBattery
                ? `Has Battery: Yes`
                : null
              ]
              .map((text, idx) => (
                <Typography key={idx} gutterBottom>
                  {text}
                </Typography>
              ))}

          {guitar.productUrl
            ? <Typography key={`${guitar.id}-link`} gutterBottom>
                Product Link: <a href={guitar.productUrl}>{guitar.productUrl}</a>
              </Typography>
            : null}
          </div>
        </Grid>

        <Grid item zeroMinWidth xs={12} sm={6}>
          <ImageComponent 
            imageSet={[guitar.picture].concat(guitar.additionalPictures)}
            isMobile={isMobile} 
            altText={guitar.name} />
        </Grid>
      </Grid>

      <Divider variant='middle'/>

      <Typography variant='h5'>
        {GuitarUtils.hasPickups(guitar)
          ? <div>
              <p>Pickups:</p>
              <ul>
                {guitar.pickups!.map(i =>
                  <li key={i.id}>
                    <PickupDetail item={i} isMobile={isMobile} />
                  </li>)}
              </ul>
            </div>
          : null}
        {GuitarUtils.hasStrings(guitar) && guitar.strings
          ? <div>
              <p>Strings:</p>
              <ul>
                <li key={guitar.strings.id}>
                  <StringsDetail item={guitar.strings} parent={guitar} isMobile={isMobile} />
                </li>
              </ul>
            </div>
          : null}
        {GuitarUtils.hasCase(guitar) && guitar.case
          ? <div>
              <p>Case:</p>
              <ul>
                <li key={guitar.case.id}>
                  <CaseDetail item={guitar.case} isMobile={isMobile} />
                </li>
              </ul>
            </div>
          : null}
        {GuitarUtils.hasModifications(guitar)
          ? <div className={classes.description}>
              <p>Modifications:</p>
              <ul>
                {guitar.modifications!.map((i, idx) =>
                  <li key={idx}>
                    <Typography>
                      {i}
                    </Typography>
                  </li>)}
              </ul>
            </div>
          : null}
        {GuitarUtils.hasControls(guitar)
          ? <div className={classes.description}>
              <p>Controls:</p>
              <ul>
                {guitar.controls!.map((i, idx) =>
                  <li key={idx}>
                    <Typography>
                      {i}
                    </Typography>
                  </li>)}
              </ul>
            </div>
          : null}
      </Typography>

      <Accordion className={isMobile ? classes.jsonExpanderMobile : classes.jsonExpander}>
        <AccordionSummary id='guitarPanelJson-header' aria-controls='guitarPanelJson-content'>
          <Typography className={classes.heading}>
            {`${GuitarUtils.isInstrument(guitar) ? 'Instrument' : 'Guitar'} JSON Data`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={isMobile ? classes.jsonMobile : classes.json}>
            <Divider />
            <Typography variant='subtitle1'>
              <pre>{JSON.stringify(guitar, undefined, 2)}</pre>
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default GuitarDetail;
