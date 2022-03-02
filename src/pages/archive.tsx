import GuitarList from '../components/GuitarList';

import { NextPage, GetStaticProps } from 'next';
import { IsMobile } from '../components/viewutils';
import { findAllArchived, findAllSold } from '../data/guitarservice/guitarservice';
import { PageProps } from '../infrastructure/sharedprops';


const pageTitle = 'Archive';
const pageListColumns = 'archive';

const ArchivePage: NextPage<PageProps> = ({ items, pathname }) => {
  const isMobile = IsMobile();

  return <GuitarList
    items={items}
    pathname={pathname}
    isMobile={isMobile}
    title={pageTitle}
    columns={pageListColumns}
  />;
};

export const getStaticProps: GetStaticProps = async () => {
  const data = [
      ...await findAllArchived(), 
      ...await findAllSold()
    ];

  return {
    props: { items: data }
  };
};

export default ArchivePage;
