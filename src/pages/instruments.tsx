import { NextPage } from 'next';

import GuitarList from '../components/GuitarList';

import { IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/shared';

import { Guitar } from '../interfaces/models/guitar';
import { findAllInstruments } from '../data/guitarservice/guitarservice';

const pageTitle = 'Instruments';
const pageListColumns = 'instrument';

const Instruments: NextPage<PageProps> = ({ items, pathname }) => {
  const isMobile = IsMobile();

  return <GuitarList
    items={items}
    pathname={pathname}
    isMobile={isMobile}
    title={pageTitle}
    columns={pageListColumns}
  />;
};

Instruments.getInitialProps = async ({ pathname }) => {
  const items: Guitar[] = [...await findAllInstruments()];

  return { items, pathname };
};

export default Instruments;
