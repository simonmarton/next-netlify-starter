import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import netlifyIdentity from 'netlify-identity-widget';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../theme';

import AuthContext from '@context/AuthContext';
import AuthPage from '@components/AuthPage';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState(null);

  // TODO: Move to separate file
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
