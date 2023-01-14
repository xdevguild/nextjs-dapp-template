import { WalletProvider } from '@multiversx/sdk-web-wallet-provider';
import { WalletConnectProvider } from '@multiversx/sdk-wallet-connect-provider';
import { ExtensionProvider } from '@multiversx/sdk-extension-provider';
import { ApiNetworkProvider, ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { HWProvider } from '@multiversx/sdk-hw-provider';

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
