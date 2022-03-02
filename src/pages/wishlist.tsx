import GuitarList from '../components/GuitarList';

import { NextPage } from 'next';
import { IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/sharedprops';
import { findAllWishlist } from '../data/guitarservice/guitarservice';

const pageTitle = 'Wishlist';
const pageListColumns = 'wishlist';

const WishlistPage: NextPage<PageProps> = ({ items, pathname }) => {
  const isMobile = IsMobile();

  return <GuitarList
    items={items}
    pathname={pathname}
    isMobile={isMobile}
    title={pageTitle}
    columns={pageListColumns}
  />;
};

export async function getStaticProps() {
  const data = await findAllWishlist();

  return {
    props: { items: data }
  };
}

export default WishlistPage;
