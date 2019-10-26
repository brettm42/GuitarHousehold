import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import DataTable from '../components/TableComponents/DataTable';
import DataDetailTable from '../components/TableComponents/DataDetailTable';

import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { buildPageTitle, IsMobile } from '../components/viewutils';

import { Project } from '../interfaces/models/project';
import { findAllProjects } from '../data/guitarservice/guitarservice';

type Props = {
  items: Project[]
  pathname: string
  isMobile: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(2, 0)
    }
  })
);

const Projects: NextPage<Props> = ({ items, pathname, isMobile }) => {
  const classes = useStyles();

  return (
    <Layout title={buildPageTitle('Project List')} pathname={pathname}>
      <div className={classes.title}>
        <Typography variant='h4' gutterBottom>
          Project Guitar List
        </Typography>
      </div>

      {isMobile
        ? <DataTable items={items} />
        : <DataDetailTable items={items} />}
    </Layout>
  );
};

Projects.getInitialProps = async ({ pathname }) => {
  const items: Project[] = await findAllProjects();
  const isMobile = IsMobile();

  return { items, pathname, isMobile };
};

export default Projects;
