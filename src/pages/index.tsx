import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import * as Constants from '../infrastructure/constants';

import HouseholdGridList from '../components/HouseholdGridComponents/HouseholdGridList';
import Layout from '../components/Layout';
import Summary from '../components/SummaryComponents/Summary';

import { GetStaticProps, NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/shared';

import { findAllGuitars, findAllInstruments, findAllProjects } from '../data/guitarservice/guitarservice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(4, 0, 4, 1),
    },
    divider: {
      margin: theme.spacing(4, 2),
    }
  })
);

const IndexPage: NextPage<PageProps> = ({ items, pathname }) => {
  const classes = useStyles();
  const isMobile = IsMobile();

  return (
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
