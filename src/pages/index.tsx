import * as React from 'react';
import * as Constants from '../infrastructure/constants';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import HouseholdGridList from '../components/HouseholdGridComponents/HouseholdGridList';
import Layout from '../components/Layout';
import Summary from '../components/SummaryComponents/Summary';

import { GetStaticProps, NextPage } from 'next';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/sharedprops';
import { findAllGuitars, findAllInstruments, findAllProjects } from '../data/guitarservice/guitarservice';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    title: {
      padding: theme.spacing(6, 0, 4, 1),
      textSizeAdjust: 'auto'
    },
    titleMobile: {
      padding: theme.spacing(3, 0, 2, 1),
      textSizeAdjust: 'auto'
    },
    divider: {
      margin: theme.spacing(4, 2)
    }
  };
});

const IndexPage: NextPage<PageProps> = ({ items, pathname }) => {
  const isMobile = IsMobile();
  const { classes } = useStyles();

  return (
    <React.StrictMode>
      <Layout title={buildPageTitle('Home')} pathname={pathname} isMobile={isMobile}>
        <div className={isMobile ? classes.titleMobile : classes.title}>
          <Typography variant={isMobile ? 'h4' : 'h2'} noWrap>
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
    </React.StrictMode>
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
