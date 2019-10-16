import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';

import { NextPage } from 'next';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { buildPageTitle } from '../components/viewutils';

type Props = {
  pathname: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(4, 2)
    },
    body: {
      padding: theme.spacing(0, 2)
    }
  })
);

const AboutPage: NextPage<Props> = ({pathname}) => {
  const classes = useStyles();

  return (
    <Layout title={buildPageTitle('About')} pathname={pathname}>
      <div className={classes.title}>
        <Typography variant='h3' gutterBottom>
          About
        </Typography>
      </div>

      <div className={classes.body}>
        <Typography variant='body2' gutterBottom>
          This is the about page...
        </Typography>
      </div>
    </Layout>
  );
};

export default AboutPage;
