import Layout from './Layout';
import { NextPage } from 'next';
import { buildPageTitle, IsMobile } from './viewutils';

type ErrorComponentProps = {
  errors: string;
  pathname: string;
};

const ErrorComponent: NextPage<ErrorComponentProps> = ({ errors, pathname }) => {
  const isMobile = IsMobile();

  return (
    <Layout title={buildPageTitle('Error')} pathname={pathname} isMobile={isMobile}>
      <div className="p-6 my-4 bg-red-50 border border-red-200 rounded-xl">
        <p className="text-red-700 font-medium">
          <span className="font-bold text-red-800">Error:</span> {errors}
        </p>
      </div>
    </Layout>
  );
};

export default ErrorComponent;
