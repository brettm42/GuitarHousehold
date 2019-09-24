import * as React from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type Props = {
  title?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.secondary,
      padding: theme.spacing(2),
      marginLeft: theme.spacing(-2),
      marginBottom: theme.spacing(2),
      '& svg': {
        margin: theme.spacing(2)
      },
      '& hr': {
        margin: theme.spacing(0, 1)
      },
      textTransform: 'capitalize'
    },
    divider: {
      margin: theme.spacing(2),
    },
    footer: {
      padding: theme.spacing(2)
    }
  })
);

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'GuitarHousehold',
}) => {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <nav>
        <Grid container alignItems='center' className={classes.root}>
          <Typography variant='button' gutterBottom>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Typography>
          <Divider orientation='vertical' />
          <Typography variant='button' gutterBottom>
            <Link href="/about">
              <a>About</a>
            </Link> 
          </Typography>
          <Divider orientation='vertical' />
          <Typography variant='button' gutterBottom>
            <Link href="/guitars">
              <a>Guitars</a>
            </Link>
          </Typography>
          <Divider orientation='vertical' />
          <Typography variant='button' gutterBottom>
            <Link href="/projects">
              <a>Projects</a>
            </Link>
          </Typography>
        </Grid>
      </nav>

      {children}

      <footer>
        <div className={classes.footer}>
          <Divider className={classes.divider} />
          <Typography variant='body2' gutterBottom>
            I'm here to stay (Footer)
          </Typography>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
