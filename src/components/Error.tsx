import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';

import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { buildPageTitle } from '../components/viewutils';

type ErrorProps = {
  errors: string;
  pathname: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    body: {
      padding: theme.spacing(4)
    }
  })
);

const Error: NextPage<ErrorProps> = ({ errors, pathname }) => {
  const classes = useStyles();

  return (
    <Layout title={buildPageTitle('Error')} pathname={pathname}>
      <div className={classes.body}>
        <Typography>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </Typography>
      </div>
    </Layout>
  );
};

export default Error;
