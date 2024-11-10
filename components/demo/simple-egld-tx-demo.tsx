import { TransactionPayload, TokenTransfer } from '@multiversx/sdk-core';
import {
  useTransaction,
  TransactionCallbackParams,
  useConfig,
  useLoggingIn,
} from '@useelven/core';
import { shortenHash } from '@/lib/shorten-hash';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ConnectWalletInfo } from '@/components/demo/connect-wallet-info';

const transferAddress = process.env.NEXT_PUBLIC_TRANSFER_ADDRESS || '';
const egldTransferAmount = process.env.NEXT_PUBLIC_EGLD_TRANSFER_AMOUNT || '';

export const SimpleEGLDTxDemo = ({
  cb,
}: {
  cb: (params: TransactionCallbackParams) => void;
}) => {
  const { pending, triggerTx } = useTransaction({ cb, id: 'SimpleEGLDTxDemo' });
  const { loggedIn } = useLoggingIn();
  const { explorerAddress, chainType } = useConfig();

  const handleSendTx = () => {
    const demoMessage =
      'Transaction demo from xDevGuild Next.js dapp template!';

    triggerTx({
      address: transferAddress,
      gasLimit: 50000 + 1500 * demoMessage.length,
      data: new TransactionPayload(demoMessage),
      value: TokenTransfer.egldFromAmount(egldTransferAmount),
    });
  };

  return (
    <Card className="flex flex-1 flex-col justify-between">
      <CardContent className="mt-6">
        <div className="mb-4">
          1. You will be sending 0.001 EGLD to the address: <br />
          <a
            className="font-bold"
            href={`${explorerAddress}/accounts/${transferAddress}`}
            target="_blank"
          >
            {shortenHash(transferAddress, 8)}
          </a>{' '}
          <br />({chainType})
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          disabled={pending || !loggedIn}
          onClick={handleSendTx}
        >
          Send Transaction
        </Button>
        <ConnectWalletInfo loggedIn={loggedIn} />
      </CardFooter>
    </Card>
  );
};
