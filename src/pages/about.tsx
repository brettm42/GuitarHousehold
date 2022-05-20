import * as React from 'react';
import * as Constants from '../infrastructure/constants';

import Image from 'next/image';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Layout from '../components/Layout';

import { NextPage } from 'next';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { PageProps } from '../infrastructure/sharedprops';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { getStringText } from '../data/stringservice/stringservice';

const useStyles = makeStyles()((theme: Theme) => {
  return {
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
  };
});

const AboutPage: NextPage<PageProps> = ({ pathname }) => {
  const title = 'About';
  const isMobile = IsMobile();

  const { classes } = useStyles();
  
  return (
    <Layout title={buildPageTitle(title)} pathname={pathname} isMobile={isMobile}>
      <div className={classes.titleRight}>
        <Typography variant='h5' gutterBottom>
          <Link href='/debug'>
            <a>
              {getStringText('DebugIcon')}
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
          {getStringText('AboutPageBody')}
        </Typography>
      </div>

      <div className={classes.image}>
        <Image className={classes.img} src={Constants.AboutPageImg1} alt={getStringText('AboutPageImageAlt')} layout='fill' />
        <Image className={classes.img} src={Constants.AboutPageImg2} alt={getStringText('AboutPageImageAlt')} layout='fill' />
      </div>
    </Layout>
  );
};

export default AboutPage;
