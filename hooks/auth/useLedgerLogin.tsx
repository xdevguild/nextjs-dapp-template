import { Address, Account } from '@elrondnetwork/erdjs';
import { HWProvider } from '@elrondnetwork/erdjs-hw-provider';
import { ApiNetworkProvider } from '@elrondnetwork/erdjs-network-providers';
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
import { DappProvider } from '../../types/network';
import { errorParse } from '../../utils/errorParse';

export const useLedgerLogin = (params?: Login) => {
  const { logout } = useLogout();
  const { isLoggedIn, isLoggingIn, error } = useLoggingIn();

  const login = async (addressIndex = 0) => {
    const apiNetworkProvider =
      getNetworkState<ApiNetworkProvider>('apiNetworkProvider');
    const dappProvider = getNetworkState<DappProvider>('dappProvider');

    if (!dappProvider) {
      const hwWalletProvider = new HWProvider();
      await hwWalletProvider.init();
      setNetworkState<DappProvider>('dappProvider', hwWalletProvider);
    }

    if (params?.token) {
      setLoginInfoState('loginToken', String(params.token));
    }

    setAccountState('addressIndex', addressIndex);

    let userAddress;

    try {
      if (params?.token) {
        if (dappProvider instanceof HWProvider) {
          const loginInfo = await dappProvider.tokenLogin({
            token: Buffer.from(`${params?.token}{}`),
            addressIndex,
          });

          if (loginInfo.address) {
            userAddress = loginInfo.address;
          }

          if (loginInfo.signature) {
            setLoginInfoState('signature', loginInfo.signature.hex());
          }
        }
      } else {
        if (dappProvider instanceof HWProvider) {
          const address = await dappProvider.login({ addressIndex });
          if (address) {
            userAddress = address;
          }
        }
      }

      if (userAddress) {
        setAccountState('address', userAddress);
        setLoggingInState('loggedIn', Boolean(userAddress));

        if (apiNetworkProvider) {
          const addressInstance = new Address(userAddress);
          const userAccountInstance = new Account(addressInstance);
          const userAccountOnNetwork = await apiNetworkProvider.getAccount(
            addressInstance
          );
          userAccountInstance.update(userAccountOnNetwork);

          setAccountState('nonce', userAccountInstance.nonce.valueOf());
          setAccountState('balance', userAccountInstance.balance.toString());
        }
      }

      setLoginInfoState('loginMethod', LoginMethodsEnum.ledger);
      setLoginInfoState('expires', getNewLoginExpiresTimestamp());

      optionalRedirect(params?.callbackRoute);
    } catch (e) {
      const err = errorParse(e);
      setLoggingInState('error', `Error logging in ${err}`);
    } finally {
      setLoggingInState('pending', false);
    }
  };

  const getHWAccounts = async (page = 0, pageSize = 10) => {
    const dappProvider = getNetworkState<DappProvider>('dappProvider');
    let hwWalletProvider;

    if (dappProvider instanceof HWProvider) {
      hwWalletProvider = dappProvider;
      if (!hwWalletProvider.isInitialized()) await hwWalletProvider.init();
    } else {
      hwWalletProvider = new HWProvider();
      await hwWalletProvider.init();
      setNetworkState<DappProvider>('dappProvider', hwWalletProvider);
    }

    return hwWalletProvider.getAccounts(page, pageSize);
  };

  return {
    login,
    isLoggedIn,
    isLoggingIn,
    getHWAccounts,
    error,
    logout,
  };
};
