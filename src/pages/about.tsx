import * as React from 'react';
import * as Constants from '../infrastructure/constants';

import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';

import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
    },
    image: {
      width: '100%',
      padding: theme.spacing(2)
    }
  })
);

const AboutPage: NextPage<Props> = ({pathname}) => {
  const classes = useStyles();

  return (
    <Layout title={buildPageTitle('About')} pathname={pathname}>
      <div className={classes.title}>
        <Typography variant='h4' gutterBottom>
          About
        </Typography>
      </div>

      <img className={classes.image} src={Constants.AboutPageImg1} />
      <img className={classes.image} src={Constants.AboutPageImg2} />

      <div className={classes.body}>
        <Typography variant='body2' gutterBottom>
          This is the about page...
        </Typography>
      </div>
    </Layout>
  );
};

export default AboutPage;
