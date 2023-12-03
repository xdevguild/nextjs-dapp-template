'use client';

import {
  TransactionCallbackParams,
  useConfig,
  useScDeploy,
} from '@useelven/core';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const SimpleDeployScDemo = ({
  cb,
}: {
  cb: (params: TransactionCallbackParams) => void;
}) => {
  const { explorerAddress } = useConfig();
  const { deploy, scAddress, txResult, pending } = useScDeploy({ cb });

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
            <strong>
              <a
                href={`${explorerAddress}/accounts/${scAddress}`}
                target="_blank"
              >
                {scAddress}
              </a>
            </strong>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" disabled={pending} onClick={handleDeploy}>
          {pending ? 'Pending...' : 'Deploy'}
        </Button>
      </CardFooter>
    </Card>
  );
};
