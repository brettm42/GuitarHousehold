import GuitarList from '../components/GuitarList';
import { GetStaticProps, NextPage } from 'next';
import { IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/sharedprops';
import { findAllProjects } from '../data/guitarservice/guitarservice';

const pageTitle = 'Project List';
const pageListColumns = 'project';

const ProjectsPage: NextPage<PageProps> = ({ items, pathname }) => {
  const isMobile = IsMobile();

  return (
    <GuitarList
      items={items}
      pathname={pathname}
      isMobile={isMobile}
      title={pageTitle}
      columns={pageListColumns}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await findAllProjects();

  return {
    props: { items: data },
  };
};

export default ProjectsPage;
