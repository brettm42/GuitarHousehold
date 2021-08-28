import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import Layout from './Layout';

import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { buildPageTitle } from './viewutils';

type ErrorComponentProps = {
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

const ErrorComponent: NextPage<ErrorComponentProps> = ({ errors, pathname }) => {
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

export default ErrorComponent;
