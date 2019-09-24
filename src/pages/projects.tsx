import Layout from '../components/Layout';
import List from '../components/List';
import Typography from '@material-ui/core/Typography';

import { NextPage } from 'next';

import { Project } from '../interfaces/models/project';
import { findAllProjects } from '../data/guitarservice/guitarservice';

type Props = {
  items: Project[]
  pathname: string
}

const Projects: NextPage<Props> = ({ items, pathname }) => (
  <Layout title="Project List | GuitarHousehold 🎸">
    <Typography variant='h4' gutterBottom>
      Project Guitar List
    </Typography>
    <Typography variant='body2' gutterBottom>
      You are currently on: {pathname}
    </Typography>

    <List items={items} />
  </Layout>
);

Projects.getInitialProps = async ({ pathname }) => {
  const items: Project[] = await findAllProjects();

  return { items, pathname };
};

export default Projects;
