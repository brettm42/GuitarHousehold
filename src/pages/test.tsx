import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';

import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { TextPageProps } from '../infrastructure/shared';
import { buildPageTitle } from '../components/viewutils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(4, 2, 2, 2)
    },
    body: {
      padding: theme.spacing(2)
    },
    body2: {
      padding: theme.spacing(2)
    },
    response: {
      padding: theme.spacing(2)
    }
  })
);

const TestPage: NextPage<TextPageProps> = ({ responses, pathname }) => {
  const title = 'Test';
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
          {`This is the test page for: ${responses}`}
        </Typography>
      </div>

      <div className={classes.body2}>
        <Typography variant='subtitle1' gutterBottom>
          {pathname}
        </Typography>
      </div>

      <div className={classes.response}>
        {responses?.map((response, idx) => (
          <div key={idx}>
            <Typography variant='caption' gutterBottom>
              {response}
            </Typography>
          </div>
        ))}
      </div>
    </Layout>
  );
};

TestPage.getInitialProps = async ({ pathname }) => {
  const responses = [ "test", "test" ];
  
  return { responses, pathname };
};

export default TestPage;
