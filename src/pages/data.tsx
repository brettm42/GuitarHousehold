import ChartComponent from '../components/DataComponents/ChartComponent';
import Layout from '../components/Layout';
import { GetStaticProps, NextPage } from 'next';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/sharedprops';
import {
  findAllGuitars,
  findAllInstruments,
  findAllProjects,
} from '../data/guitarservice/guitarservice';

const DataPage: NextPage<PageProps> = ({ items, pathname }) => {
  const title = 'Data';
  const isMobile = IsMobile();

  return (
    <Layout title={buildPageTitle(title)} pathname={pathname} isMobile={isMobile}>
      <div className="py-4 space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
          {title}
        </h1>

        <div>
          <ChartComponent data={items} isMobile={isMobile} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = [
    ...(await findAllGuitars()),
    ...(await findAllProjects()),
    ...(await findAllInstruments()),
  ];

  return {
    props: { items: data },
  };
};

export default DataPage;
