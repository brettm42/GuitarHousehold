import { NextPage } from 'next';

import GuitarList from '../components/GuitarList';

import { IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/shared';

import { Guitar } from '../interfaces/models/guitar';
import { findAllInstruments } from '../data/guitarservice/guitarservice';

const pageTitle = 'Instrument List';
const pageListColumns = 'instrument';

const InstrumentsPage: NextPage<PageProps> = ({ items, pathname }) => {
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
  const items: Guitar[] = [ ...await findAllInstruments() ];

  return {
    props: { items }
  };
}

export default InstrumentsPage;
