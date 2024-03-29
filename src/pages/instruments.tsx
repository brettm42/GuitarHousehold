import GuitarList from '../components/GuitarList';

import { NextPage } from 'next';
import { IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/sharedprops';
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
  const data = await findAllInstruments();

  return {
    props: { items: data }
  };
}

export default InstrumentsPage;
