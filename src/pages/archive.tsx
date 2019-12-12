import { NextPage } from 'next';

import GuitarList from '../components/GuitarList';

import { IsMobile } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { findAllArchived, findAllSold } from '../data/guitarservice/guitarservice';

type ArchiveProps = {
  items: Guitar[];
  pathname: string;
  title: string;
  isMobile: boolean;
};

const Archive: NextPage<ArchiveProps> = ({ items, pathname, title, isMobile }) => {
  return <GuitarList
    items={items}
    pathname={pathname}
    isMobile={isMobile}
    title={title}
    columns={'archive'}
  />;
};

Archive.getInitialProps = async ({ pathname }) => {
  const items: Guitar[] = [...await findAllArchived(), ...await findAllSold()];
  const title = 'Archive';
  const isMobile = IsMobile();

  return { items, pathname, title, isMobile };
};

export default Archive;
