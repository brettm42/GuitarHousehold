import * as Constants from '../infrastructure/constants';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { NextPage } from 'next';
import { PageProps } from '../infrastructure/sharedprops';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { getStringText } from '../data/stringservice/stringservice';

const AboutPage: NextPage<PageProps> = ({ pathname }) => {
  const title = 'About';
  const isMobile = IsMobile();

  return (
    <Layout title={buildPageTitle(title)} pathname={pathname} isMobile={isMobile}>
      <div className="py-4 space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
            {title}
          </h1>
          <Link
            href="/debug"
            className="text-xl p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            title="Debug"
          >
            {getStringText('DebugIcon')}
          </Link>
        </div>

        <div className="text-neutral-700 leading-relaxed text-sm sm:text-base">
          <p>{getStringText('AboutPageBody')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden shadow-sm border border-neutral-200 bg-white flex items-center justify-center p-2">
            <Image
              src={Constants.AboutPageImg1}
              alt={getStringText('AboutPageImageAlt')}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-2"
            />
          </div>

          <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden shadow-sm border border-neutral-200 bg-white flex items-center justify-center p-2">
            <Image
              src={Constants.AboutPageImg2}
              alt={getStringText('AboutPageImageAlt')}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-2"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
