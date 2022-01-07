import * as React from 'react';
import * as Constants from '../infrastructure/constants';

import createCache from '@emotion/cache';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import HouseholdGridList from '../components/HouseholdGridComponents/HouseholdGridList';
import Layout from '../components/Layout';
import Summary from '../components/SummaryComponents/Summary';

import { GetStaticProps, NextPage } from 'next';
import { CacheProvider } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/shared';
import { findAllGuitars, findAllInstruments, findAllProjects } from '../data/guitarservice/guitarservice';

export const muiCache = createCache({
  "key": "mui",
  "prepend": true
});

const theme = createTheme();

const useStyles = makeStyles()((theme: Theme) => {
  return {
    title: {
      padding: theme.spacing(4, 0, 4, 1),
    },
    divider: {
      margin: theme.spacing(4, 2),
    }
  };
});

const IndexPage: NextPage<PageProps> = ({ items, pathname }) => {
  const { classes } = useStyles();
  const isMobile = IsMobile();

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <Layout title={buildPageTitle('Home')} pathname={pathname}>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />

          <div className={classes.title}>
            <Typography variant='h3'>
              {Constants.SiteTitle}
            </Typography>
          </div>

          <div>
            <Summary data={items} isMobile={isMobile} />
          </div>

          <Divider className={classes.divider} />

          <div>
            <HouseholdGridList data={items} isMobile={isMobile} />
          </div>
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = [
    ...await findAllGuitars(),
    ...await findAllProjects(),
    ...await findAllInstruments()
  ];

  return {
    props: { items: data }
  };
};

export default IndexPage;
