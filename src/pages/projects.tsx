import Link from 'next/link';

import Layout from '../components/Layout';
import List from '../components/List';

import { NextPage } from 'next';

import { Project } from '../interfaces/models/project';
import { findAllProjects } from '../data/guitarservice/guitarservice';

type Props = {
  items: Project[]
  pathname: string
}

const Projects: NextPage<Props> = ({ items, pathname }) => (
  <Layout title="GuitarHousehold | Project List">
    <h1>Project Guitar Household</h1>
    <p>You are currently on: {pathname}</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

Projects.getInitialProps = async ({ pathname }) => {
  const items: Project[] = await findAllProjects();

  return { items, pathname };
}

export default Projects;
