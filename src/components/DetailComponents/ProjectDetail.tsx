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

import { Project } from '../../interfaces/models/project';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';

type ProjectDetailProps = {
  item: Project;
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
      paddingBottom: theme.spacing(2),
      '& h6:last-of-type': {
        paddingTop: theme.spacing(2)
      }
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

const ProjectDetail: React.FunctionComponent<ProjectDetailProps> = ({
  item: guitar, isMobile
}) => {
  const classes = useStyles();

  const projectSummary = (
    <div className={classes.summary}>
      {guitar.description
        ? <div>
            <Typography variant='subtitle1' gutterBottom>
              {GuitarUtils.summarizeGuitar(guitar)}
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              {guitar.description}
            </Typography>
            {guitar.construction 
              ? <Typography variant='subtitle2' gutterBottom>
                  {GuitarUtils.summarizeConstruction(guitar)}
                </Typography>
              : null}
          </div>
        : <div>
            <Typography variant='subtitle1' gutterBottom>
              {GuitarUtils.summarizeGuitar(guitar)}
            </Typography>
            {guitar.construction 
              ? <Typography variant='subtitle2' gutterBottom>
                  {GuitarUtils.summarizeConstruction(guitar)}
                </Typography>
              : null}
          </div>
      }
    </div>
  );

  return (
    <div>
      <Grid container className={classes.root} spacing={3} direction={isMobile ? 'column' : 'row'}>
        <Grid item zeroMinWidth xs={12} sm>
          <div className={classes.title}>
            <Typography variant='h4' gutterBottom>
              {(guitar.name + (GuitarUtils.isInProgress(guitar) ? ' (In\u00A0Progress)' : ''))}
            </Typography>
          </div>

          {projectSummary}

          <div>
            {[
              guitar.series
                ? `Series: ${guitar.series}`
                : null,
              `Project Started: ${guitar.projectStart}`,
              guitar.projectComplete
                ? `Project Completed: ${guitar.projectComplete}`
                : null,
              guitar.body
                ? `Body: ${guitar.body}${guitar.purchaseStore ? ` (from ${guitar.purchaseStore})` : ''}`
                : null,
              guitar.bodyStyle
                ? `Body Style: ${guitar.bodyStyle}`
                : null,
              `Color: ${guitar.color ?? 'Unfinished'}`,
              GuitarUtils.hasPurchasePrice(guitar)
                ? `Project Cost: \$${GuitarUtils.getGuitarCost(guitar)}`
                : null,
              guitar.currentPrice
                ? `Cost Today: ${guitar.currentPrice}`
                : null,
              guitar.neck
                ? `Neck: ${guitar.neck}`
                : null,
              guitar.serialNumber
                ? `s/n: ${guitar.serialNumber} (location: ${guitar.serialNumberLocation})`
                : null,
              guitar.pickguard
                ? `Pickguard: ${guitar.pickguard}`
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

      <Divider variant='middle' />

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
        <AccordionSummary id='projectPanelJson-header' aria-controls='projectPanelJson-content'>
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

export default ProjectDetail;
