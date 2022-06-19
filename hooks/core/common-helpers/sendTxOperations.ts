// Tools used internally by sent transactions hooks
import { Account, TransactionWatcher, Transaction } from '@elrondnetwork/erdjs';
import { ExtensionProvider } from '@elrondnetwork/erdjs-extension-provider';
import { WalletConnectProvider } from '@elrondnetwork/erdjs-wallet-connect-provider';
import { HWProvider } from '@elrondnetwork/erdjs-hw-provider';
import { Dispatch, SetStateAction } from 'react';
import { setAccountState } from '../../../store/auth';
import { ApiNetworkProvider } from '@elrondnetwork/erdjs-network-providers';
import { LoginMethodsEnum } from '../../../types/enums';
import { WalletProvider } from '@elrondnetwork/erdjs-web-wallet-provider';
import { DappProvider } from '../../../types/network';

export interface TransactionCb {
  transaction?: Transaction | null;
  error?: string;
  pending?: boolean;
}

export const postSendTxOperations = async (
  tx: Transaction,
  setTransaction: Dispatch<SetStateAction<Transaction | null>>,
  apiNetworkProvider: ApiNetworkProvider,
  cb?: (params: TransactionCb) => void
) => {
  let transactionWatcher = new TransactionWatcher(apiNetworkProvider);
  await transactionWatcher.awaitCompleted(tx);
  setTransaction(tx);
  cb?.({ transaction: tx, pending: false });
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
  loginInfoSnap: any,
  apiNetworkProvider: ApiNetworkProvider,
  setTransaction: Dispatch<SetStateAction<Transaction | null>>,
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
      await postSendTxOperations(tx, setTransaction, apiNetworkProvider, cb);
    }
  } catch (e: any) {
    setError(e?.message);
    cb?.({ error: e?.message });
  } finally {
    setPending(false);
    cb?.({ pending: false });
  }
};
