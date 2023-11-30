import { TransactionPayload, TokenTransfer } from '@multiversx/sdk-core';
import {
  useTransaction,
  TransactionCallbackParams,
  useConfig,
  useAccount,
} from '@useelven/core';
import { useCallback } from 'react';
import { shortenHash } from '@/lib/shortenHash';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const egldTransferAddress = process.env.NEXT_PUBLIC_EGLD_TRANSFER_ADDRESS || '';
const egldTransferAmount = process.env.NEXT_PUBLIC_EGLD_TRANSFER_AMOUNT || '';

export const SimpleEGLDTxDemo = ({
  cb,
}: {
  cb: (params: TransactionCallbackParams) => void;
}) => {
  const { pending, triggerTx } = useTransaction({ cb });
  const { activeGuardianAddress } = useAccount();
  const { explorerAddress, chainType } = useConfig();

  const handleSendTx = useCallback(() => {
    const demoMessage =
      'Transaction demo from xDevGuild Next.js dapp template!';

    let gasLimit = 50000 + 1500 * demoMessage.length;

    if (activeGuardianAddress) {
      gasLimit = gasLimit + 50000;
    }

    triggerTx({
      address: egldTransferAddress,
      gasLimit,
      data: new TransactionPayload(demoMessage),
      value: TokenTransfer.egldFromAmount(egldTransferAmount),
    });
  }, [activeGuardianAddress, triggerTx]);

  return (
    <Card className="flex-1 flex flex-col justify-between">
      <CardContent className="mt-6">
        <div className="mb-4">
          1. You will be sending 0.001 EGLD to the address: <br />
          <a
            className="font-bold"
            href={`${explorerAddress}/accounts/${egldTransferAddress}`}
            target="_blank"
          >
            {shortenHash(egldTransferAddress, 8)}
          </a>{' '}
          <br />({chainType})
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" disabled={pending} onClick={handleSendTx}>
          Send Transaction
        </Button>
      </CardFooter>
    </Card>
  );
};
