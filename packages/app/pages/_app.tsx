import '@/assets/css/global.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/services/SystemTheme';
import ErrorBoundary from '@/components/atom/ErrorBoundary';
import AppBar from '@/components/atom/AppBar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary>
            <AppBar />
            <Component {...pageProps} />
          </ErrorBoundary>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
