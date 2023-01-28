// Tools used internally by sent transactions hooks
import {
  Account,
  TransactionWatcher,
  Transaction,
  ITransactionOnNetwork,
} from '@multiversx/sdk-core';
import { ExtensionProvider } from '@multiversx/sdk-extension-provider';
import { WalletConnectProvider } from '@multiversx/sdk-wallet-connect-provider';
import { HWProvider } from '@multiversx/sdk-hw-provider';
import { Dispatch, SetStateAction } from 'react';
import { setAccountState, LoginInfoState } from '../../../store/auth';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import { LoginMethodsEnum } from '../../../types/enums';
import { WalletProvider } from '@multiversx/sdk-web-wallet-provider';
import { DappProvider } from '../../../types/network';
import { errorParse } from '../../../utils/errorParse';

export interface TransactionCb {
  transaction?: Transaction | null;
  error?: string;
  pending?: boolean;
  txResult?: ITransactionOnNetwork | null;
}

export const postSendTxOperations = async (
  tx: Transaction,
  setTransaction: Dispatch<SetStateAction<Transaction | null>>,
  setTxResult: Dispatch<SetStateAction<ITransactionOnNetwork | null>>,
  apiNetworkProvider: ApiNetworkProvider,
  cb?: (params: TransactionCb) => void
) => {
  const transactionWatcher = new TransactionWatcher(apiNetworkProvider);
  const txResult = await transactionWatcher.awaitCompleted(tx);
  setTransaction(tx);
  setTxResult(txResult);
  cb?.({ transaction: tx, pending: false, txResult });
  const sender = tx.getSender();
  const senderAccount = new Account(sender);
  const userAccountOnNetwork = await apiNetworkProvider.getAccount(sender);
  senderAccount.update(userAccountOnNetwork);
  setAccountState('address', senderAccount.address.bech32());
  setAccountState('nonce', senderAccount.getNonceThenIncrement());
  setAccountState('balance', senderAccount.balance.toString());
};

export const sendTxOperations = async (
  dappProvider: DappProvider,
  tx: Transaction,
  loginInfoSnap: LoginInfoState,
  apiNetworkProvider: ApiNetworkProvider,
  setTransaction: Dispatch<SetStateAction<Transaction | null>>,
  setTxResult: Dispatch<SetStateAction<ITransactionOnNetwork | null>>,
  setError: Dispatch<SetStateAction<string>>,
  setPending: Dispatch<SetStateAction<boolean>>,
  webWalletRedirectUrl?: string,
  cb?: (params: TransactionCb) => void
) => {
  try {
    if (dappProvider instanceof WalletProvider) {
      const currentUrl = window?.location.href;
      await dappProvider.signTransaction(tx, {
        callbackUrl: webWalletRedirectUrl || currentUrl,
      });
    }
    if (dappProvider instanceof ExtensionProvider) {
      await dappProvider.signTransaction(tx);
    }
    if (dappProvider instanceof WalletConnectProvider) {
      await dappProvider.signTransaction(tx);
    }
    if (dappProvider instanceof HWProvider) {
      await dappProvider.signTransaction(tx);
    }
    if (loginInfoSnap.loginMethod !== LoginMethodsEnum.wallet) {
      await apiNetworkProvider.sendTransaction(tx);
      await postSendTxOperations(
        tx,
        setTransaction,
        setTxResult,
        apiNetworkProvider,
        cb
      );
    }
  } catch (e) {
    const err = errorParse(e);
    setError(err);
    cb?.({ error: err });
  } finally {
    setPending(false);
    cb?.({ pending: false });
  }
};
