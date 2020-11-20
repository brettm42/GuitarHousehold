import { NextPage, GetStaticProps } from 'next';

import GuitarList from '../components/GuitarList';

import { PageProps } from '../infrastructure/shared';
import { IsMobile } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { findAllArchived, findAllSold } from '../data/guitarservice/guitarservice';

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
    props: {
      items
    }
  };
};

export default ArchivePage;
