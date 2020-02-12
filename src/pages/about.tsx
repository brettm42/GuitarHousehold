import * as React from 'react';
import * as Constants from '../infrastructure/constants';

import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';

import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { PageProps } from '../infrastructure/shared';
import { buildPageTitle } from '../components/viewutils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(4, 2, 2, 2)
    },
    body: {
      padding: theme.spacing(0, 2)
    },
    imgDiv: {
      padding: theme.spacing(2)
    },
    image: {
      maxWidth: '90%',
      padding: theme.spacing(2)
    }
  })
);

const AboutPage: NextPage<PageProps> = ({ pathname }) => {
  const title = 'About';
  const classes = useStyles();

  return (
    <Layout title={buildPageTitle(title)} pathname={pathname}>
      <div className={classes.title}>
        <Typography variant='h4' gutterBottom>
          {title}
        </Typography>
      </div>

      <div className={classes.body}>
        <Typography variant='body2' gutterBottom>
          {'This is the about page...'}
        </Typography>
      </div>

      <div className={classes.imgDiv}>
        <img className={classes.image} src={Constants.AboutPageImg1} />
        <img className={classes.image} src={Constants.AboutPageImg2} />
      </div>
    </Layout>
  );
};

export default AboutPage;
