/* eslint-disable react-hooks/exhaustive-deps */
import {
  SmartContract,
  ContractFunction,
  Address,
  Transaction,
  TypedValue,
  TokenPayment,
} from '@elrondnetwork/erdjs';
import { ApiNetworkProvider } from '@elrondnetwork/erdjs-network-providers';
import { useSnapshot } from 'valtio';
import { accountState, loginInfoState } from '../../store/auth';
import { getNetworkState } from '../../store/network';
import { chainType, networkConfig } from '../../config/network';
import { DappProvider } from '../../types/network';
import { useState } from 'react';
import {
  TransactionCb,
  sendTxOperations,
} from './common-helpers/sendTxOperations';
import { useWebWalletTxSend } from './common-helpers/useWebWalletTxSend';

interface ScTransactionParams {
  smartContractAddress: string;
  func: string;
  gasLimit: number;
  args: TypedValue[] | undefined;
  value: number | undefined;
}

interface SCTransactionArgs {
  cb?: (params: TransactionCb) => void;
  webWalletRedirectUrl?: string;
}

export function useScTransaction(
  { webWalletRedirectUrl, cb }: SCTransactionArgs = {
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
    smartContractAddress,
    func,
    gasLimit,
    args,
    value,
  }: ScTransactionParams) => {
    setTransaction(null);
    setError('');
    if (
      dappProvider &&
      apiNetworkProvider &&
      currentNonce !== undefined &&
      !pending
    ) {
      setPending(true);
      cb?.({ pending: true });

      const contract = new SmartContract({
        address: new Address(smartContractAddress),
      });

      let tx = contract.call({
        func: new ContractFunction(func),
        gasLimit,
        args,
        ...(value ? { value: TokenPayment.egldFromAmount(value) } : {}),
        chainID: networkConfig[chainType].shortId,
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
