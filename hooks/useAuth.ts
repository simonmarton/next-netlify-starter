import { useContext } from 'react';
import AuthContext from '@context/AuthContext';

const useAuth = () => {
  const ctxValue = useContext(AuthContext);

  return {
    ...ctxValue,
    isAuthenticated: !!ctxValue.user,
  };
};
export default useAuth;
