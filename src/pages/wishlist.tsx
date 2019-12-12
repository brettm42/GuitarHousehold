import { NextPage } from 'next';

import GuitarList from '../components/GuitarList';

import { IsMobile } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { findAllWishlist } from '../data/guitarservice/guitarservice';

type WishlistProps = {
  items: Guitar[];
  pathname: string;
  title: string;
  isMobile: boolean;
};

const Wishlist: NextPage<WishlistProps> = ({ items, pathname, title, isMobile }) => {
  return <GuitarList
    items={items}
    pathname={pathname}
    isMobile={isMobile}
    title={title}
    columns={'wishlist'}
  />;
};

Wishlist.getInitialProps = async ({ pathname }) => {
  const items: Guitar[] = [...await findAllWishlist()];
  const title = 'Wishlist';
  const isMobile = IsMobile();

  return { items, pathname, title, isMobile };
};

export default Wishlist;
