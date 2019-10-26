import * as React from 'react';

import * as Constants from '../infrastructure/constants';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import HouseholdGridList from '../components/HouseholdGridList';
import Layout from '../components/Layout';
import Summary from '../components/Summary';

import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { buildPageTitle } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { Project } from '../interfaces/models/project';
import { findAllGuitars, findAllProjects } from '../data/guitarservice/guitarservice';

type Props = {
  guitars: Guitar[],
  projects: Project[],
  pathname: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(4, 0, 0, 1),
    },
    divider: {
      margin: theme.spacing(4, 2),
    }
  })
);

const IndexPage: NextPage<Props> = ({ guitars, projects, pathname }) => {
  const data = [...guitars, ...projects];
  const classes = useStyles();

  return (
    <Layout title={buildPageTitle('Home')} pathname={pathname}>
      <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />

      <div className={classes.title}>
        <Typography variant='h3' gutterBottom>
          {Constants.SiteTitle}
        </Typography> 
      </div>

      <div>
        <Summary data={data} />
      </div>

      <Divider className={classes.divider} />

      <div>
        <HouseholdGridList data={data} />
      </div>
    </Layout>
  );
};

IndexPage.getInitialProps = async ({ pathname }) => {
  const guitars: Guitar[] = await findAllGuitars();
  const projects: Project[] = await findAllProjects();

  return { guitars, projects, pathname };
};

export default IndexPage;
