import * as React from 'react';

import Typography from '@mui/material/Typography';
import ChartComponent from '../components/DataComponents/ChartComponent';
import Layout from '../components/Layout';

import { GetStaticProps, NextPage } from 'next';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/sharedprops';
import { findAllGuitars, findAllInstruments, findAllProjects } from '../data/guitarservice/guitarservice';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    title: {
      padding: theme.spacing(4, 0, 0, 1),
    },
    divider: {
      margin: theme.spacing(4, 2),
    }
  };
});

const DataPage: NextPage<PageProps> = ({ items, pathname }) => {
  const title = 'Data';
  const isMobile = IsMobile();
  
  const { classes } = useStyles();

  return (
    <Layout title={buildPageTitle(title)} pathname={pathname} isMobile={isMobile}>
      <div className={classes.title}>
        <Typography variant='h4'>
          {title}
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
    props: { items: data }
  };
};

export default DataPage;
