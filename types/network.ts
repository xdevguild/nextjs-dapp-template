import { WalletProvider } from '@elrondnetwork/erdjs-web-wallet-provider';
import { WalletConnectProvider } from '@elrondnetwork/erdjs-wallet-connect-provider';
import { ExtensionProvider } from '@elrondnetwork/erdjs-extension-provider';
import { ApiNetworkProvider } from '@elrondnetwork/erdjs-network-providers';
import { HWProvider } from '@elrondnetwork/erdjs-hw-provider';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers';

export interface BaseNetworkType {
  id: string;
  shortId: string;
  name: string;
  egldLabel: string;
  egldDenomination: string;
  decimals: string;
  gasPerDataByte: string;
  walletConnectDeepLink: string;
  walletAddress: string;
  apiAddress: string;
  explorerAddress: string;
  apiTimeout: string;
}

export interface NetworkType extends BaseNetworkType {
  walletConnectBridgeAddresses: string[];
}

export type DappProvider =
  | ExtensionProvider
  | WalletConnectProvider
  | WalletProvider
  | HWProvider;

export type NetworkProvider = ApiNetworkProvider | ProxyNetworkProvider;
