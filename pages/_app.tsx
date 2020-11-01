import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import netlifyIdentity from 'netlify-identity-widget';

import AuthContext from '@context/AuthContext';
import AuthPage from '@components/AuthPage';

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
  });

  return (
    <AuthContext.Provider value={{ user, login: auth.login, logout: auth.logout }}>
      <AuthPage>
        <Component {...pageProps} />
      </AuthPage>
    </AuthContext.Provider>
  );
};

export default MyApp;
