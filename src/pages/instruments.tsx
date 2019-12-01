import { NextPage } from 'next';

import GuitarList from '../components/GuitarList';

import { IsMobile } from '../components/viewutils';

import { Guitar } from '../interfaces/models/guitar';
import { findAllInstruments } from '../data/guitarservice/guitarservice';

type Props = {
  items: Guitar[]
  pathname: string
  title: string
  isMobile: boolean
}

const Instruments: NextPage<Props> = ({ items, pathname, title, isMobile }) => {
  return <GuitarList 
      items={items} 
      pathname={pathname} 
      isMobile={isMobile} 
      title={title} 
      columns={'instrument'}
    />;
};

Instruments.getInitialProps = async ({ pathname }) => {
  const items: Guitar[] = [ ...await findAllInstruments() ];
  const title = 'Instruments';
  const isMobile = IsMobile();
  
  return { items, pathname, title, isMobile };
};

export default Instruments;
