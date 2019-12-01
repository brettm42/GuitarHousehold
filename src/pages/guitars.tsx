import { NextPage } from 'next';

import GuitarList from '../components/GuitarList';

import { IsMobile } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { findAllGuitars } from '../data/guitarservice/guitarservice';

type Props = {
  items: Guitar[]
  pathname: string
  title: string
  isMobile: boolean
}

const Guitars: NextPage<Props> = ({ items, pathname, title, isMobile }) => {
  return <GuitarList
      items={items}
      pathname={pathname}
      isMobile={isMobile}
      title={title}
      columns={'guitar'}
    />;
};

Guitars.getInitialProps = async ({ pathname }) => {
  const items: Guitar[] = await findAllGuitars();
  const title = 'Guitar List';
  const isMobile = IsMobile();

  return { items, pathname, title, isMobile };
};

export default Guitars;
