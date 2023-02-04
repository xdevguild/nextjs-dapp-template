import { useProxy } from '../tools/useProxy';
import { loginInfoState } from '../../store/auth';

export const useLoginInfo = () => {
  const loginInfoSnap = useProxy(loginInfoState);

  return {
    loginMethod: loginInfoSnap.loginMethod,
    expires: loginInfoSnap.expires,
    loginToken: loginInfoSnap.loginToken,
    signature: loginInfoSnap.signature,
  };
};
