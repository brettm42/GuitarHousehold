import { NextPage } from 'next';

import GuitarList from '../components/GuitarList';

import { IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/shared';

import { Guitar } from '../interfaces/models/guitar';
import { findAllGuitars } from '../data/guitarservice/guitarservice';

const pageTitle = 'Guitar List';
const pageListColumns = 'guitar';

const Guitars: NextPage<PageProps> = ({ items, pathname }) => {
  const isMobile = IsMobile();

  return <GuitarList
    items={items}
    pathname={pathname}
    isMobile={isMobile}
    title={pageTitle}
    columns={pageListColumns}
  />;
};

Guitars.getInitialProps = async ({ pathname }) => {
  const items: Guitar[] = await findAllGuitars();

  return { items, pathname };
};

export default Guitars;
