import { NextPage } from 'next';

import GuitarList from '../components/GuitarList';

import { IsMobile } from '../components/viewutils';

import { Project } from '../interfaces/models/project';
import { findAllProjects } from '../data/guitarservice/guitarservice';

type Props = {
  items: Project[]
  pathname: string
  title: string
  isMobile: boolean
}

const Projects: NextPage<Props> = ({ items, pathname, title, isMobile }) => {
  return <GuitarList 
    items={items} 
    pathname={pathname} 
    isMobile={isMobile} 
    title={title} />;
};

Projects.getInitialProps = async ({ pathname }) => {
  const items: Project[] = await findAllProjects();
  const title = 'Project List';
  const isMobile = IsMobile();

  return { items, pathname, title, isMobile };
};

export default Projects;
