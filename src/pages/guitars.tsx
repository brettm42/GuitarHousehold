import GuitarList from '../components/GuitarList';
import { GetStaticProps, NextPage } from 'next';
import { IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/sharedprops';
import { findAllGuitars } from '../data/guitarservice/guitarservice';

const pageTitle = 'Guitar List';
const pageListColumns = 'guitar';

const GuitarsPage: NextPage<PageProps> = ({ items, pathname }) => {
  const isMobile = IsMobile();

  return (
    <GuitarList
      items={items}
      pathname={pathname}
      isMobile={isMobile}
      title={pageTitle}
      columns={pageListColumns}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await findAllGuitars();

  return {
    props: { items: data },
  };
};

export default GuitarsPage;
