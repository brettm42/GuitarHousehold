import GuitarList from '../components/GuitarList';

import { NextPage, GetStaticProps } from 'next';
import { IsMobile } from '../components/viewutils';
import { findAllArchived, findAllSold } from '../data/guitarservice/guitarservice';
import { PageProps } from '../infrastructure/shared';
import { Guitar } from '../interfaces/models/guitar';


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
  const items: Guitar[] = 
    [
      ...await findAllArchived(), 
      ...await findAllSold()
    ];

  return {
    props: { items }
  };
};

export default ArchivePage;
