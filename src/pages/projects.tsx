import { NextPage } from 'next';

import GuitarList from '../components/GuitarList';

import { IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/shared';

import { Project } from '../interfaces/models/project';
import { findAllProjects } from '../data/guitarservice/guitarservice';

const pageTitle = 'Project List';
const pageListColumns = 'project';

const ProjectsPage: NextPage<PageProps> = ({ items, pathname }) => {
  const isMobile = IsMobile();

  return <GuitarList
    items={items}
    pathname={pathname}
    isMobile={isMobile}
    title={pageTitle}
    columns={pageListColumns}
  />;
};

ProjectsPage.getInitialProps = async ({ pathname }) => {
  const items: Project[] = await findAllProjects();

  return { items, pathname };
};

export default ProjectsPage;
