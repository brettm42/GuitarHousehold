import * as React from 'react';
import * as Constants from '../infrastructure/constants';

import Link from 'next/link';

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
    titleRight: {
      padding: theme.spacing(5, 2, 2, 2),
      float: 'right'
    },
    body: {
      padding: theme.spacing(0, 2)
    },
    image: {
      padding: theme.spacing(2)
    },
    img: {
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
      <div className={classes.titleRight}>
        <Typography variant='h5' gutterBottom>
          <Link href='/debug'>
            <a>
              {'?'}
            </a>
          </Link>
        </Typography>
      </div>

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

      <div className={classes.image}>
        <img className={classes.img} src={Constants.AboutPageImg1} />
        <img className={classes.img} src={Constants.AboutPageImg2} />
      </div>
    </Layout>
  );
};

export default AboutPage;
