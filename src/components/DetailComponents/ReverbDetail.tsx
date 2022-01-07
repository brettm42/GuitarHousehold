import * as React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import {
  averagePriceForKeywordsAsync,
  getRecentSearchCacheStatsAsync,
  getReverbUserFriendlyUrl,
  numberOfListingsForKeywordsAsync
} from '../../data/reverbservice/reverbservice';

type ReverbDetailProps = {
  keywords: string;
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
    title: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2)
    },
    body: {
      paddingLeft: theme.spacing(2)
    },
    link: {
      paddingTop: theme.spacing(2)
    },
    footer: {
      paddingTop: theme.spacing(2)
    }
  };
});

const ReverbDetail: React.FunctionComponent<ReverbDetailProps> = ({
  keywords, isMobile
}) => {
  const { classes } = useStyles();
  const [ averagePrice, setAveragePrice ] = React.useState('');
  const [ numberOfListings, setNumberOfListings ] = React.useState('');
  const [ reverbCacheStats, setReverbCacheStats ] = React.useState('');

  React.useEffect(() => {
    async function getReverbData(keywords: string) {
      const avgPrice = await averagePriceForKeywordsAsync(keywords);
      const numOfListings = await numberOfListingsForKeywordsAsync(keywords);

      setAveragePrice(avgPrice);
      setNumberOfListings(numOfListings);
    }

    async function getCacheStats() {
      const cacheStats = await getRecentSearchCacheStatsAsync();

      setReverbCacheStats(cacheStats);
    }

    getReverbData(keywords);
    getCacheStats();
  }, []);

  return (
    <div>
      <Grid container className={classes.root} spacing={3} direction={isMobile ? 'column' : 'row'}>
        <Grid item zeroMinWidth xs={12} sm={6}>
          <div className={classes.title}>
            <Typography variant='h5' gutterBottom>
              Now on Reverb:
            </Typography>
          </div>

          <div className={classes.body}>
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

            <div className={classes.link}>
              <Typography key={'reverb-link'} variant='subtitle2' gutterBottom>
                Search on Reverb.com - <a target={isMobile ? '' : '_blank'} href={getReverbUserFriendlyUrl(keywords)}>{getReverbUserFriendlyUrl(keywords)}</a>
              </Typography>
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className={classes.footer}>
            <Typography key={'reverb-plug'} variant='caption'>
              {`Data from api.reverb.com, searched for ${encodeURI(keywords)} (${reverbCacheStats})`}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReverbDetail;
