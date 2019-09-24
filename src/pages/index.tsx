import * as React from 'react';

import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import HouseholdGridList from '../components/HouseholdGridList';
import Layout from '../components/Layout';
import Summary from '../components/Summary';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { NextPage } from 'next';

import { Guitar } from '../interfaces/models/guitar';
import { Project } from '../interfaces/models/project';
import { findAllGuitars, findAllProjects } from '../data/guitarservice/guitarservice';

type Props = {
  guitars: Guitar[],
  projects: Project[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      margin: theme.spacing(4, 2),
    },
    about: {
      paddingTop: theme.spacing(4)
    }
  }),
);

const IndexPage: NextPage<Props> = ({ guitars, projects }) => {
  const data = [...guitars, ...projects];
  const classes = useStyles();

  return (
    <Layout title="GuitarHousehold | Home">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

      <Typography variant="h2" gutterBottom>
        GuitarHousehold 👋
      </Typography>
      <div>
        <Summary data={data} />
      </div>

      <Divider className={classes.divider} />

      <div>
        <HouseholdGridList data={data} />
      </div>

      <div className={classes.about}>
        <Link href="/about">
          <a>
            <Typography variant='button' gutterBottom>
              About
            </Typography>
          </a>
        </Link>
      </div>
    </Layout>
  );
}

IndexPage.getInitialProps = async () => {
  const guitars: Guitar[] = await findAllGuitars();
  const projects: Project[] = await findAllProjects();

  return { guitars, projects };
}

export default IndexPage;
