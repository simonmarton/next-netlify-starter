import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import netlifyIdentity from 'netlify-identity-widget';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';

import AuthContext from '@context/AuthContext';
import AuthPage from '@components/AuthPage';

const primaryGreen = green[500];
const accentGreen = green.A200;
const darkGreen = green[900];
const primaryPurple = purple[500];
const accentPurple = purple.A200;
const darkPurple = purple[900];

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: accentPurple,
      main: primaryPurple,
      dark: darkPurple,
      contrastText: '#fff',
    },
    secondary: {
      light: accentGreen,
      main: primaryGreen,
      dark: darkGreen,
      contrastText: '#fff',
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState(null);

  const auth = {
    init() {
      netlifyIdentity.on('login', (user) => {
        setUser(user);
        netlifyIdentity.close();
      });

      netlifyIdentity.on('logout', () => {
        setUser(null);
      });
      netlifyIdentity.on('error', (err) => console.error('Error', err));

      netlifyIdentity.init();
    },
    login() {
      netlifyIdentity.open();
    },
    logout() {
      netlifyIdentity.logout();
    },
  };

  useEffect(() => {
    console.log({ pageProps });
    auth.init();
  }, []);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login: auth.login, logout: auth.logout }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthPage>
          <Component {...pageProps} />
        </AuthPage>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default MyApp;
