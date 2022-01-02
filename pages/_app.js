import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import {lightTheme,darkTheme} from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import '../style/global.css'
import Header from '../src/components/Layout/header';
import Footer from '../src/components/Layout/footer';
import { Paper } from '@mui/material';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [theme, setTheme] = React.useState('light')
  
  
    const toggleTheme = () => {
      if (theme === "light") {
        window.localStorage.setItem("theme", "dark");
        setTheme("dark");
      } else {
        window.localStorage.setItem("theme", "light");
        setTheme("light");
      }
    
  }
  React.useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Project Manager</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      
        <Header changeThemeHandler={toggleTheme} />
        <Paper elevation={0} sx={{borderRadius:0}}>
        <Component {...pageProps} />
        </Paper>
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
