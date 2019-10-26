import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import DataTable from '../components/TableComponents/DataTable';

import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { buildPageTitle } from '../components/viewutils';

import { Project } from '../interfaces/models/project';
import { findAllProjects } from '../data/guitarservice/guitarservice';

type Props = {
  items: Project[]
  pathname: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(2, 0)
    },
    body: {
      padding: theme.spacing(0, 2)
    }
  })
);

const Projects: NextPage<Props> = ({ items, pathname }) => {
  const classes = useStyles();

  return (
    <Layout title={buildPageTitle('Project List')} pathname={pathname}>
      <div className={classes.title}>
        <Typography variant='h4' gutterBottom>
          Project Guitar List
        </Typography>
      </div>

      <Typography variant='body2' gutterBottom>
        You are currently on: {pathname}
      </Typography>

      <DataTable items={items} />
    </Layout>
  );
};

Projects.getInitialProps = async ({ pathname }) => {
  const items: Project[] = await findAllProjects();

  return { items, pathname };
};

export default Projects;
