'use client';

import {
  TransactionCallbackParams,
  useConfig,
  useLoggingIn,
  useScDeploy,
} from '@useelven/core';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConnectWalletInfo } from '@/components/demo/connect-wallet-info';
import { shortenHash } from '@/lib/shorten-hash';

export const SimpleDeployScDemo = ({
  cb,
}: {
  cb: (params: TransactionCallbackParams) => void;
}) => {
  const { explorerAddress } = useConfig();
  const { loggedIn } = useLoggingIn();
  const { deploy, scAddress, txResult, pending } = useScDeploy({
    cb,
    id: 'SimpleDeployScDemo',
  });

  const handleDeploy = () => {
    deploy({ source: '/piggybank.wasm' });
  };

  return (
    <Card className="flex-1 flex flex-col justify-between w-full">
      <CardContent className="mt-6">
        <div className="mb-4">
          You will be deploying a{' '}
          <a
            href="https://github.com/xdevguild/multiversx-simple-sc"
            target="_blank"
            className="underline"
          >
            <strong>Piggy Bank</strong>
          </a>{' '}
          simple smart contract.
        </div>
        {!pending && txResult && scAddress && (
          <div className="lg:max-w-lg w-full break-words white">
            Your deployed smart contract address:
            <br />
            <a
              href={`${explorerAddress}/accounts/${scAddress}`}
              target="_blank"
              className="font-bold underline"
            >
              {shortenHash(scAddress, 12)}
            </a>
            <br />
            <small>
              To interact with it, check the{' '}
              <a
                href="https://piggy-bank-dapp.netlify.app/"
                target="_blank"
                className="underline"
              >
                Piggy Bank Dapp
              </a>
            </small>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          disabled={pending || !loggedIn}
          onClick={handleDeploy}
        >
          {pending ? 'Pending...' : 'Deploy'}
        </Button>
        <ConnectWalletInfo loggedIn={loggedIn} />
      </CardFooter>
    </Card>
  );
};
