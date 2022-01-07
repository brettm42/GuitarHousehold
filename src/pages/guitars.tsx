import GuitarList from '../components/GuitarList';

import { NextPage } from 'next';
import { IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/shared';
import { Guitar } from '../interfaces/models/guitar';
import { findAllGuitars } from '../data/guitarservice/guitarservice';

const pageTitle = 'Guitar List';
const pageListColumns = 'guitar';

const GuitarsPage: NextPage<PageProps> = ({ items, pathname }) => {
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
  const items: Guitar[] = await findAllGuitars();

  return {
    props: { items }
  };
}

export default GuitarsPage;
