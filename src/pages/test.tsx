import Layout from '../components/Layout';
import { GetStaticProps, NextPage } from 'next';
import { TextPageProps } from '../infrastructure/sharedprops';
import { buildPageTitle, IsMobile } from '../components/viewutils';

const TestPage: NextPage<TextPageProps> = ({ responses, pathname }) => {
  const title = 'Test';
  const isMobile = IsMobile();

  return (
    <Layout title={buildPageTitle(title)} pathname={pathname} isMobile={isMobile}>
      <div className="py-4 space-y-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
          {title}
        </h1>

        <p className="text-sm text-neutral-600">
          {`This is the test page for: ${responses?.join(', ') || ''}`}
        </p>

        <p className="text-xs font-mono text-neutral-500 bg-neutral-100 p-2 rounded">
          {pathname}
        </p>

        <div className="space-y-2">
          {responses?.map((response, idx) => (
            <div key={idx} className="p-3 bg-white border border-neutral-200 rounded-lg text-xs font-mono">
              {response}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const responses = ['test', 'test'];
  return {
    props: { responses, pathname: '/test' },
  };
};

export default TestPage;
