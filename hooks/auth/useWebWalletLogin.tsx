import { WalletProvider } from '@multiversx/sdk-web-wallet-provider';
import { LoginMethodsEnum } from '../../types/enums';
import { getNewLoginExpiresTimestamp } from '../../utils/expiresAt';
import {
  DAPP_INIT_ROUTE,
  getActiveNetworkConfiguration,
} from '../../config/network';
import { setLoginInfoState, setLoggingInState } from '../../store/auth';
import { useLogout } from './useLogout';
import { Login } from '../../types/account';
import { useLoggingIn } from './useLoggingIn';
import { errorParse } from '../../utils/errorParse';

export const useWebWalletLogin = (params?: Login) => {
  const { logout } = useLogout();
  const { isLoggedIn, isLoggingIn, error } = useLoggingIn();

  const login = async () => {
    setLoggingInState('pending', true);

    const providerInstance = new WalletProvider(
      `${getActiveNetworkConfiguration().walletAddress}${DAPP_INIT_ROUTE}`
    );

    const callbackUrl: string =
      typeof window !== 'undefined'
        ? encodeURIComponent(
            `${window.location.origin}${params?.callbackRoute || '/'}`
          )
        : '/';
    const providerLoginData = {
      callbackUrl,
      ...(params?.token && { token: params?.token }),
    };

    try {
      setLoginInfoState('loginMethod', LoginMethodsEnum.wallet);
      await providerInstance.login(providerLoginData);
      setLoginInfoState('expires', getNewLoginExpiresTimestamp());
      if (params?.token) {
        setLoginInfoState('loginToken', params.token);
      }
    } catch (e) {
      const err = errorParse(e);
      setLoggingInState('error', `Error logging in ${err}`);
      setLoginInfoState('loginMethod', '');
    } finally {
      setLoggingInState('pending', false);
    }
  };

  return {
    login,
    isLoggedIn,
    isLoggingIn,
    error,
    logout,
  };
};

export default useWebWalletLogin;
