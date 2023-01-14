import { NetworkType } from '../types/network';

// Default MultiversX network configuration (constants).
// Change if you need, but by default, you shouldn't have to do that.

export const DEFAULT_MIN_GAS_LIMIT = 50_000;

export const DAPP_CONFIG_ENDPOINT = '/dapp/config';
export const DAPP_INIT_ROUTE = '/dapp/init';

export const chainType = process.env.NEXT_PUBLIC_MULTIVERSX_CHAIN || 'devnet';

export const networkConfig: Record<string, NetworkType> = {
  devnet: {
    id: 'devnet',
    shortId: 'D',
    name: 'Devnet',
    egldLabel: 'xEGLD',
    egldDenomination: '18',
    decimals: '4',
    gasPerDataByte: '1500',
    walletConnectDeepLink:
      'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://xportal.com/',
    walletConnectBridgeAddresses: ['https://bridge.walletconnect.org'],
    walletAddress: 'https://devnet-wallet.multiversx.com',
    apiAddress:
      process.env.NEXT_PUBLIC_MULTIVERSX_API || 'https://devnet-api.multiversx.com',
    explorerAddress: 'https://devnet-explorer.multiversx.com',
    apiTimeout: '4000',
  },

  testnet: {
    id: 'testnet',
    shortId: 'T',
    name: 'Testnet',
    egldLabel: 'xEGLD',
    egldDenomination: '18',
    decimals: '4',
    gasPerDataByte: '1500',
    walletConnectDeepLink:
      'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://xportal.com/',
    walletConnectBridgeAddresses: ['https://bridge.walletconnect.org'],
    walletAddress: 'https://testnet-wallet.multiversx.com',
    apiAddress:
      process.env.NEXT_PUBLIC_MULTIVERSX_API ||
      'https://testnet-api.multiversx.com',
    explorerAddress: 'https://testnet-explorer.multiversx.com',
    apiTimeout: '4000',
  },

  mainnet: {
    id: 'mainnet',
    shortId: '1',
    name: 'Mainnet',
    egldLabel: 'EGLD',
    egldDenomination: '18',
    decimals: '4',
    gasPerDataByte: '1500',
    walletConnectDeepLink:
      'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://xportal.com/',
    walletConnectBridgeAddresses: ['https://bridge.walletconnect.org'],
    walletAddress: 'https://wallet.multiversx.com',
    apiAddress:
      process.env.NEXT_PUBLIC_MULTIVERSX_API || 'https://api.multiversx.com',
    explorerAddress: 'https://explorer.multiversx.com',
    apiTimeout: '4000',
  },
};

export const getActiveNetworkConfiguration = () => {
  return networkConfig[chainType];
};
