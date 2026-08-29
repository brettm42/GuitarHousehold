import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function GuitarHouseHold({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

