import { Address, Account } from '@elrondnetwork/erdjs';
import { ExtensionProvider } from '@elrondnetwork/erdjs-extension-provider';
import { LoginMethodsEnum } from '../../types/enums';
import { optionalRedirect } from '../../utils/optionalRedirect';
import {
  setAccountState,
  setLoginInfoState,
  setLoggingInState,
} from '../../store/auth';
import { setNetworkState, getNetworkState } from '../../store/network';
import { getNewLoginExpiresTimestamp } from '../../utils/expiresAt';
import { useLogout } from './useLogout';
import { Login } from '../../types/account';
import { useLoggingIn } from './useLoggingIn';
import { ApiNetworkProvider } from '@elrondnetwork/erdjs-network-providers';
import { errorParse } from '../../utils/errorParse';

export const useExtensionLogin = (params?: Login) => {
  const { logout } = useLogout();
  const { isLoggedIn, isLoggingIn, error } = useLoggingIn();

  const login = async () => {
    const apiNetworkProvider =
      getNetworkState<ApiNetworkProvider>('apiNetworkProvider');
    const providerInstance = ExtensionProvider.getInstance();

    try {
      if (!providerInstance.isInitialized()) {
        const isSuccessfullyInitialized: boolean =
          await providerInstance.init();

        if (!isSuccessfullyInitialized) {
          console.warn(
            'Something went wrong trying to redirect to wallet login..'
          );
          return;
        }
      }

      const callbackUrl: string =
        typeof window !== 'undefined'
          ? encodeURIComponent(
              `${window.location.origin}${params?.callbackRoute}`
            )
          : '/';
      const providerLoginData = {
        callbackUrl,
        ...(params?.token && { token: params?.token }),
      };

      try {
        await providerInstance.login(providerLoginData);
      } catch (e) {
        const err = errorParse(e);
        console.warn(`Something went wrong trying to login the user: ${err}`);
      }

      setNetworkState('dappProvider', providerInstance);

      const { signature, address } = providerInstance.account;

      const userAddressInstance = new Address(address);
      const userAccountInstance = new Account(userAddressInstance);

      if (apiNetworkProvider) {
        try {
          const userAccountOnNetwork = await apiNetworkProvider.getAccount(
            userAddressInstance
          );
          userAccountInstance.update(userAccountOnNetwork);

          setAccountState('address', userAccountInstance.address.bech32());

          setAccountState('nonce', userAccountInstance.nonce.valueOf());
          setAccountState('balance', userAccountInstance.balance.toString());
        } catch (e) {
          const err = errorParse(e);
          console.warn(
            `Something went wrong trying to synchronize the user account: ${err}`
          );
        }
      }

      if (signature) {
        setLoginInfoState('signature', signature);
      }
      if (params?.token) {
        setLoginInfoState('loginToken', String(params.token));
      }
      setLoginInfoState('loginMethod', LoginMethodsEnum.extension);
      setLoginInfoState('expires', getNewLoginExpiresTimestamp());

      setLoggingInState('loggedIn', Boolean(address));

      optionalRedirect(params?.callbackRoute);
    } catch (e) {
      const err = errorParse(e);
      setLoggingInState('error', `Error logging in ${err}`);
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
