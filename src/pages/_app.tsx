import Head from 'next/head';
import type { AppProps } from 'next/app';
import { AccountProvider } from '../contexts/AccountContext';
import '../styles/globals.css';

export default function GuitarHouseHold({ Component, pageProps }: AppProps) {
  const { initialAccounts, initialAccountId, initialData } = pageProps || {};

  return (
    <AccountProvider
      initialAccounts={initialAccounts}
      initialAccountId={initialAccountId}
      initialData={initialData}
    >
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </AccountProvider>
  );
}
