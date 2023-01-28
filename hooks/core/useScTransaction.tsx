// This hook is an abstraction for standard useTransaction, it hides the payload preparation for smart contract
// In the future both will be merged in one

/* eslint-disable react-hooks/exhaustive-deps */
import {
  ContractFunction,
  Address,
  Transaction,
  TypedValue,
  TokenPayment,
  ContractCallPayloadBuilder,
  ITransactionOnNetwork,
} from '@multiversx/sdk-core';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import { useSnapshot } from 'valtio';
import { accountState, loginInfoState } from '../../store/auth';
import { getNetworkState } from '../../store/network';
import { getActiveNetworkConfiguration } from '../../config/network';
import { DappProvider } from '../../types/network';
import { useState } from 'react';
import {
  TransactionCb,
  sendTxOperations,
} from './common-helpers/sendTxOperations';
import { useWebWalletTxSend } from './common-helpers/useWebWalletTxSend';

interface ScTransactionParams {
  smartContractAddress: string;
  func: ContractFunction;
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
  const [txResult, setTxResult] = useState<ITransactionOnNetwork | null>(null);
  const accountSnap = useSnapshot(accountState);
  const loginInfoSnap = useSnapshot(loginInfoState);

  const dappProvider = getNetworkState<DappProvider>('dappProvider');
  const apiNetworkProvider =
    getNetworkState<ApiNetworkProvider>('apiNetworkProvider');
  const currentNonce = accountSnap.nonce;

  useWebWalletTxSend({ setPending, setTransaction, setTxResult, setError, cb });

  const triggerTx = async ({
    smartContractAddress,
    func,
    gasLimit,
    args,
    value,
  }: ScTransactionParams) => {
    setTransaction(null);
    setTxResult(null);
    setError('');
    if (
      dappProvider &&
      apiNetworkProvider &&
      currentNonce !== undefined &&
      !pending &&
      accountSnap.address &&
      func
    ) {
      setPending(true);
      cb?.({ pending: true });

      const data = new ContractCallPayloadBuilder()
        .setFunction(func)
        .setArgs(args || [])
        .build();

      const tx = new Transaction({
        data,
        gasLimit,
        ...(value ? { value: TokenPayment.egldFromAmount(value) } : {}),
        chainID: getActiveNetworkConfiguration().shortId,
        receiver: new Address(smartContractAddress),
        sender: new Address(accountSnap.address),
      });

      tx.setNonce(currentNonce);

      sendTxOperations(
        dappProvider,
        tx,
        loginInfoSnap,
        apiNetworkProvider,
        setTransaction,
        setTxResult,
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
    txResult,
    error,
  };
}
