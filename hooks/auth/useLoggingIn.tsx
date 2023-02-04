import { useProxy } from '../tools/useProxy';
import { loggingInState } from '../../store/auth';

export const useLoggingIn = () => {
  const loggingInSnap = useProxy(loggingInState);

  return {
    isLoggingIn: loggingInSnap.pending,
    error: loggingInSnap.error,
    isLoggedIn: loggingInSnap.loggedIn,
  };
};
