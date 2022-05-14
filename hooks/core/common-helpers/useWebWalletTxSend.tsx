import { useEffect, Dispatch, SetStateAction, useRef } from 'react';
import {
  WALLET_PROVIDER_CALLBACK_PARAM,
  WALLET_PROVIDER_CALLBACK_PARAM_TX_SIGNED,
} from '@elrondnetwork/erdjs-web-wallet-provider';
import { Transaction } from '@elrondnetwork/erdjs';
import { useSnapshot } from 'valtio';
import { getParamFromUrl } from '../../../utils/getParamFromUrl';
import { getNetworkState } from '../../../store/network';
import { DappProvider } from '../../../types/network';
import { accountState } from '../../../store/auth';
import { ApiNetworkProvider } from '@elrondnetwork/erdjs-network-providers';
import { postSendTxOperations, TransactionCb } from './sendTxOperations';

interface UseWebWalletTxSendProps {
  setPending: Dispatch<SetStateAction<boolean>>;
  setTransaction: Dispatch<SetStateAction<Transaction | null>>;
  setError: Dispatch<SetStateAction<string>>;
  cb?: (params: TransactionCb) => void;
}

export const useWebWalletTxSend = ({
  setPending,
  setTransaction,
  cb,
  setError,
}: UseWebWalletTxSendProps) => {
  const dappProvider = getNetworkState<DappProvider>('dappProvider');
  const accountSnap = useSnapshot(accountState);
  const currentNonce = accountSnap.nonce;
  const apiNetworkProvider =
    getNetworkState<ApiNetworkProvider>('apiNetworkProvider');

  useEffect(() => {
    const walletProviderStatus = getParamFromUrl(
      WALLET_PROVIDER_CALLBACK_PARAM
    );

    const send = async () => {
      if ('getTransactionsFromWalletUrl' in dappProvider) {
        const txs = dappProvider.getTransactionsFromWalletUrl();
        // For now it is prepared for handling one transaction at a time
        const transactionObj = txs?.[0];
        if (!transactionObj) return;
        transactionObj.data = Buffer.from(transactionObj.data).toString(
          'base64'
        );
        window.history.replaceState(null, '', window.location.pathname);
        setPending(true);
        cb?.({ pending: true });
        const transaction = Transaction.fromPlainObject(transactionObj);
        transaction.setNonce(currentNonce);
        try {
          await apiNetworkProvider.sendTransaction(transaction);
          await postSendTxOperations(
            transaction,
            setTransaction,
            apiNetworkProvider,
            cb
          );
        } catch (e: any) {
          setError(e?.message);
          cb?.({ error: e?.message });
        } finally {
          setPending(false);
          cb?.({ pending: false });
        }
      }
    };

    if (
      walletProviderStatus === WALLET_PROVIDER_CALLBACK_PARAM_TX_SIGNED &&
      apiNetworkProvider &&
      dappProvider
    ) {
      send();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
