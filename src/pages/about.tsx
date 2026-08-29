import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { GetStaticProps, NextPage } from 'next';
import { PageProps } from '../infrastructure/sharedprops';
import { buildPageTitle, IsMobile } from '../components/viewutils';
import { getStringText } from '../data/stringservice/stringservice';
import { resolveImageArray } from '../infrastructure/imageutils';
import { getAvailableAccounts, getDefaultAccount } from '../data/accountservice/accountservice';
import { useAccount } from '../contexts/AccountContext';

const AboutPage: NextPage<PageProps> = ({ pathname }) => {
  const title = 'About';
  const isMobile = IsMobile();
  const { activeAccount, accountData } = useAccount();

  const aboutAssets =
    activeAccount?.assets?.aboutPage ||
    accountData?.assets?.aboutPage;

  const images = resolveImageArray(aboutAssets?.images, '/images/about');

  return (
    <Layout title={buildPageTitle(title)} pathname={pathname} isMobile={isMobile}>
      <div className="py-4 space-y-6 max-w-5xl">
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

        {images.length > 0 && (
          <div
            className={`grid gap-6 pt-4 ${
              images.length === 1
                ? 'grid-cols-1 max-w-xl mx-auto'
                : images.length === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
            }`}
          >
            {images.map((img, idx) => (
              <div
                key={`${img}-${idx}`}
                className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden shadow-sm border border-neutral-200 bg-white flex items-center justify-center p-2 group hover:shadow-md transition-shadow"
              >
                <Image
                  src={img}
                  alt={`${getStringText('AboutPageImageAlt')} ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const accounts = getAvailableAccounts();
  const defaultAccount = getDefaultAccount();

  return {
    props: {
      items: [],
      initialAccounts: accounts,
      initialAccountId: defaultAccount.id,
    },
  };
};

export default AboutPage;
