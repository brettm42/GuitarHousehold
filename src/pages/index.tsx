import * as Constants from '../infrastructure/constants';
import HouseholdGridList from '../components/HouseholdGridComponents/HouseholdGridList';
import Layout from '../components/Layout';
import Summary from '../components/SummaryComponents/Summary';
import { GetStaticProps, NextPage } from 'next';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { PageProps } from '../infrastructure/sharedprops';
import {
  findAllGuitars,
  findAllInstruments,
  findAllProjects,
} from '../data/guitarservice/guitarservice';

const IndexPage: NextPage<PageProps> = ({ items, pathname }) => {
  const isMobile = IsMobile();

  return (
    <Layout title={buildPageTitle('Home')} pathname={pathname} isMobile={isMobile}>
      <div className="py-4 space-y-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
          {Constants.SiteTitle}
        </h1>

        <div>
          <Summary data={items} isMobile={isMobile} />
        </div>

        <hr className="my-8 border-neutral-200" />

        <div>
          <HouseholdGridList data={items} isMobile={isMobile} />
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

export default IndexPage;
