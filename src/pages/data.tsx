import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import * as Constants from '../infrastructure/constants';

import ChartComponent from '../components/DataComponents/ChartComponent';
import Layout from '../components/Layout';

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

const DataPage: NextPage<PageProps> = ({ items, pathname }) => {
  const classes = useStyles();
  const isMobile = IsMobile();

  return (
    <Layout title={buildPageTitle('Data')} pathname={pathname}>
      <div className={classes.title}>
        <Typography variant='h3'>
          {Constants.SiteTitle}
        </Typography>
      </div>

      <div>
        <ChartComponent data={items} isMobile={isMobile} />
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
    props: {
      items: data
    }
  };
};

export default DataPage;
