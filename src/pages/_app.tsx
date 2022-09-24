import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';

import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';

import createEmotionCache from '../components/createEmotionCache';
import theme from '../components/theme';

const clientSideEmotionCache = createEmotionCache();

export default function GuitarHouseHold( { Component, pageProps }: AppProps ) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component { ...pageProps } />
      </ThemeProvider>
    </CacheProvider>
  );
};
