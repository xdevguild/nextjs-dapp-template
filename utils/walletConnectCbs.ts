import { Address, Account } from '@elrondnetwork/erdjs';
import { WalletConnectProvider } from '@elrondnetwork/erdjs-wallet-connect-provider';
import { ApiNetworkProvider } from '@elrondnetwork/erdjs-network-providers';
import { setAccountState, setLoginInfoState } from '../store/auth';
import { LoginMethodsEnum } from '../types/enums';
import { optionalRedirect } from '../utils/optionalRedirect';
import { errorParse } from './errorParse';

export const WcOnLogin = async (
  apiNetworkProvider?: ApiNetworkProvider,
  dappProvider?: WalletConnectProvider,
  callbackRoute?: string
) => {
  const address = await dappProvider?.getAddress();

  const userAddressInstance = new Address(address);
  const userAccountInstance = new Account(userAddressInstance);

  if (apiNetworkProvider) {
    try {
      const userAccountOnNetwork = await apiNetworkProvider.getAccount(
        userAddressInstance
      );
      userAccountInstance.update(userAccountOnNetwork);
      setAccountState('address', userAccountInstance.address.bech32());
    } catch (e) {
      const err = errorParse(e);
      console.warn(
        `Something went wrong trying to synchronize the user account: ${err}`
      );
    }
  }

  setLoginInfoState('loginMethod', LoginMethodsEnum.walletconnect);

  optionalRedirect(callbackRoute);
};
