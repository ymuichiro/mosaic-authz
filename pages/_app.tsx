import '@/assets/css/global.css';
import AppBar from '@/components/atom/AppBar';
import ErrorBoundary from '@/components/atom/ErrorBoundary';
import theme from '@/services/SystemTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

export const MosaicCheckedContext = React.createContext<{
  isMosaicChecked: boolean;
  setIsMosaicChecked: React.Dispatch<React.SetStateAction<boolean>>;
}>({} as any);

export default function App({ Component, pageProps }: AppProps) {
  const [isMosaicChecked, setIsMosaicChecked] = React.useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Symbol Mosaic Authz</title>
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@faunsu19000' />
        <meta name='twitter:image' content={`${process.env.NEXT_PUBLIC_URL ?? ''}/twitter-card.png`} />
        <meta name='twitter:title' content='Home | Symbol Mosaic Authz' />
        <meta
          name='description'
          content="Verify possession of the Blockchain Symbol's Mosaic and apply for admission to the discord private channel"
        />
        <meta
          name='twitter:description'
          content="Verify possession of the Blockchain Symbol's Mosaic and apply for admission to the discord private channel"
        />
      </Head>

      <SessionProvider session={pageProps.session}>
        <MosaicCheckedContext.Provider value={{ isMosaicChecked, setIsMosaicChecked }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
              <AppBar />
              <Component {...pageProps} />
            </ErrorBoundary>
          </ThemeProvider>
        </MosaicCheckedContext.Provider>
      </SessionProvider>
    </>
  );
}
