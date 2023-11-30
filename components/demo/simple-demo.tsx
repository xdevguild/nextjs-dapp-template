'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  TransactionCallbackParams,
  LoginMethodsEnum,
  useConfig,
  useLoginInfo,
} from '@useelven/core';
import { SimpleEGLDTxDemo } from './simple-egld-tx-demo';
import { SimpleNftMintDemo } from './simple-nft-mint-demo';
import { SimpleScQeryDemo } from './simple-sc-query-demo';
import { shortenHash } from '@/lib/shortenHash';
import { SimpleSignMessageDemo } from './sign-message-demo';

export const SimpleDemo = () => {
  const [result, setResult] = useState<{ type: string; content: string }>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();
  const { loginMethod } = useLoginInfo();
  const { explorerAddress } = useConfig();

  // TODO: these callbacks will be deprecated in useElven
  const handleTxCb = useCallback(
    ({ transaction, pending, error }: TransactionCallbackParams) => {
      if (transaction) {
        setResult({ type: 'tx', content: transaction.getHash().hex() });
        setPending(false);
        setError(undefined);
      }
      if (pending) {
        setPending(true);
        setError(undefined);
        setResult(undefined);
      }
      if (error) {
        setError(error);
        setPending(false);
        setResult(undefined);
      }
    },
    []
  );

  const handleQueryCb = useCallback(
    (queryResult: string, pending: boolean, error: string) => {
      if (queryResult) {
        setResult({ type: 'query', content: queryResult });
        setPending(false);
        setError(undefined);
      }
      if (pending) {
        setPending(true);
        setError(undefined);
        setResult(undefined);
      }
      if (error) {
        setError(error);
        setPending(false);
        setResult(undefined);
      }
    },
    []
  );

  const handleClose = useCallback(() => {
    setResult(undefined);
    setPending(false);
    setError(undefined);
  }, []);

  return (
    <div className="relative">
      <div className="flex gap-8 flex-wrap justify-center items-stretch mb-4 flex-col lg:flex-row">
        <SimpleEGLDTxDemo cb={handleTxCb} />
        <SimpleNftMintDemo cb={handleTxCb} />
      </div>
      <div className="flex gap-8 flex-wrap justify-center items-stretch mb-4 flex-col lg:flex-row">
        <SimpleScQeryDemo cb={handleQueryCb} />
        <SimpleSignMessageDemo />
      </div>
      {error && (
        <div className="flex flex-col items-center justify-center absolute inset-0 backdrop-blur-sm bg-zinc-200 bg-opacity-60 dark:bg-zinc-950 dark:bg-opacity-60">
          <div className="text-xl font-bold">Transaction status:</div>
          <div className="text-lg">{error}</div>
          <Button variant="outline" className="mt-4" onClick={handleClose}>
            Close
          </Button>
        </div>
      )}
      {pending && (
        <div className="flex flex-col items-center justify-center absolute inset-0 backdrop-blur-sm bg-zinc-200 bg-opacity-60 dark:bg-zinc-950 dark:bg-opacity-60">
          <div className="text-xl font-bold">
            Transaction is pending. Please wait.
          </div>
          {loginMethod === LoginMethodsEnum.walletconnect && (
            <div>
              Confirm it on the xPortal mobile app and wait till it finishes.
            </div>
          )}
          {loginMethod === LoginMethodsEnum.ledger && (
            <div>Confirm it on the Ledger app and wait till it finishes.</div>
          )}
          {loginMethod === LoginMethodsEnum.extension && (
            <div>Confirm using the MultiversX browser extension.</div>
          )}
          <div>You will get the transaction hash and link at the end.</div>
          <div className="mt-6">
            <Spinner />
          </div>
        </div>
      )}
      {result?.type && (
        <div className="flex flex-col items-center justify-center absolute inset-0 backdrop-blur-sm bg-zinc-200 bg-opacity-60 dark:bg-zinc-950 dark:bg-opacity-60">
          {result.type === 'tx' ? (
            <>
              <div className="text-xl font-bold">Transaction hash:</div>
              <a
                className="underline text-lg"
                href={`${explorerAddress}/transactions/${result.content}`}
                target="_blank"
              >
                {shortenHash(result.content, 10)}
              </a>
            </>
          ) : (
            <>
              <div className="text-xl font-bold">Query result</div>
              <div className="text-lg">
                There is{' '}
                <span className="font-bold text-xl inline-block">
                  {result.content}
                </span>{' '}
                NFTs left to mint!
              </div>
            </>
          )}

          <Button variant="outline" className="mt-4" onClick={handleClose}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
};
