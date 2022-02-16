import * as React from 'react';

import Typography from '@mui/material/Typography';
import Layout from './Layout';

import { NextPage } from 'next';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { buildPageTitle, IsMobile } from './viewutils';

type ErrorComponentProps = {
  errors: string;
  pathname: string;
};

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {},
    body: {
      padding: theme.spacing(4)
    }
  };
});

const ErrorComponent: NextPage<ErrorComponentProps> = ({ errors, pathname }) => {
  const { classes } = useStyles();
  const isMobile = IsMobile();

  return (
    <Layout title={buildPageTitle('Error')} pathname={pathname} isMobile={isMobile}>
      <div className={classes.body}>
        <Typography>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </Typography>
      </div>
    </Layout>
  );
};

export default ErrorComponent;
