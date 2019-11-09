import { NextPage } from 'next';

import GuitarList from '../components/GuitarList';

import { IsMobile } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { findAllArchived } from '../data/guitarservice/guitarservice';

type Props = {
  items: Guitar[]
  pathname: string
  title: string
  isMobile: boolean
}

const Archive: NextPage<Props> = ({ items, pathname, title, isMobile }) => {
  return <GuitarList 
    items={items} 
    pathname={pathname} 
    isMobile={isMobile} 
    title={title} />;
};

Archive.getInitialProps = async ({ pathname }) => {
  const items: Guitar[] = await findAllArchived();
  const title = 'Archive';
  const isMobile = IsMobile();
  
  return { items, pathname, title, isMobile };
};

export default Archive;
