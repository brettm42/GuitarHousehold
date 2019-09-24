import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';

const AboutPage: React.FunctionComponent = () => (
  <Layout title="About | GuitarHousehold">
    <Typography variant='h3' gutterBottom>
      About
    </Typography>
    <Typography variant='body2' gutterBottom>
      This is the about page...
    </Typography>
  </Layout>
);

export default AboutPage;
