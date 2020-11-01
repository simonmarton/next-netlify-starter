import useAuth from '@hooks/useAuth';
import { Fragment } from 'react';
import Header from '@components/Header';

const AuthPage = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    // redirect to root?
    return <button onClick={login}>Login</button>;
  }

  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};
export default AuthPage;
