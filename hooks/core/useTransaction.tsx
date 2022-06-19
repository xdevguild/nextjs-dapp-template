/* eslint-disable react-hooks/exhaustive-deps */
import {
  Address,
  Transaction,
  ITransactionPayload,
  IGasLimit,
  TokenPayment,
} from '@elrondnetwork/erdjs';
import { ApiNetworkProvider } from '@elrondnetwork/erdjs-network-providers';
import { useSnapshot } from 'valtio';
import { accountState, loginInfoState } from '../../store/auth';
import { getNetworkState } from '../../store/network';
import { chainType, networkConfig } from '../../config/network';
import { DappProvider } from '../../types/network';
import { useState } from 'react';
import { useWebWalletTxSend } from './common-helpers/useWebWalletTxSend';
import {
  TransactionCb,
  sendTxOperations,
} from './common-helpers/sendTxOperations';

interface TransactionParams {
  address: string;
  gasLimit: IGasLimit;
  data?: ITransactionPayload;
  value?: number;
}

interface TransactionArgs {
  webWalletRedirectUrl?: string;
  cb?: (params: TransactionCb) => void;
}

export function useTransaction(
  { webWalletRedirectUrl, cb }: TransactionArgs = {
    webWalletRedirectUrl: undefined,
    cb: undefined,
  }
) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const accountSnap = useSnapshot(accountState);
  const loginInfoSnap = useSnapshot(loginInfoState);

  const dappProvider = getNetworkState<DappProvider>('dappProvider');
  const apiNetworkProvider =
    getNetworkState<ApiNetworkProvider>('apiNetworkProvider');
  const currentNonce = accountSnap.nonce;

  useWebWalletTxSend({ setPending, setTransaction, setError, cb });

  const triggerTx = async ({
    address,
    data,
    gasLimit,
    value,
  }: TransactionParams) => {
    setTransaction(null);
    setError('');

    if (
      dappProvider &&
      apiNetworkProvider &&
      currentNonce !== undefined &&
      !pending &&
      accountSnap.address
    ) {
      setPending(true);
      cb?.({ pending: true });

      const tx = new Transaction({
        nonce: currentNonce,
        receiver: new Address(address),
        gasLimit,
        chainID: networkConfig[chainType].shortId,
        data,
        ...(value ? { value: TokenPayment.egldFromAmount(value) } : {}),
        sender: new Address(accountSnap.address),
      });

      tx.setNonce(currentNonce);

      sendTxOperations(
        dappProvider,
        tx,
        loginInfoSnap,
        apiNetworkProvider,
        setTransaction,
        setError,
        setPending,
        webWalletRedirectUrl,
        cb
      );
    } else {
      setError(
        'There is something wrong with the network synchronization. Check if you are logged in.'
      );
    }
  };

  return {
    pending,
    triggerTx,
    transaction,
    error,
  };
}
