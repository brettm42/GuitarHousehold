import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  averagePriceForKeywordsAsync,
  getReverbUserFriendlyUrl,
  numberOfListingsForKeywordsAsync  
} from '../../data/reverbservice/reverbservice';

type ReverbDetailProps = {
  keywords: string;
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
    link: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    footer: {
      paddingTop: theme.spacing(2)
    }
  })
);

const ReverbDetail: React.FunctionComponent<ReverbDetailProps> = ({
  keywords, isMobile
}) => {
  const classes = useStyles();
  const [ averagePrice, setAveragePrice ] = React.useState('');
  const [ numberOfListings, setNumberOfListings ] = React.useState('');

  React.useEffect(() => {
    async function getReverbData(keywords: string) {
      const avgPrice = await averagePriceForKeywordsAsync(keywords);
      const numOfListings = await numberOfListingsForKeywordsAsync(keywords);

      setAveragePrice(avgPrice);
      setNumberOfListings(numOfListings);
    }

    getReverbData(keywords);
  }, []);

  return (
    <div>
      <Grid container className={classes.root} spacing={3} direction={isMobile ? 'column' : 'row'}>
        <Grid item zeroMinWidth xs sm={6}>
          <div>
            <Typography variant='h5' gutterBottom>
              Now on Reverb:
            </Typography>
          </div>

          <div>
            {
              [
                averagePrice.startsWith('No')
                  ? averagePrice
                  : `Average Price: \$${averagePrice}`,
                `Number of Active Listings: ${numberOfListings}`
              ]
              .map((text, idx) => (
                <Typography key={idx} gutterBottom>
                  {text}
                </Typography>
              ))}
          </div>
          
          <div className={classes.link}>
            <Typography key={'reverb-link'} variant='subtitle2' gutterBottom>
              Search Reverb.com: <a href={getReverbUserFriendlyUrl(keywords)}>{getReverbUserFriendlyUrl(keywords)}</a>
            </Typography>
          </div>

          <div className={classes.footer}>
            <Typography key={'reverb-plug'} variant='caption'>
              {`Data pulled from api.reverb.com, searching for ${encodeURI(keywords)}`}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReverbDetail;
