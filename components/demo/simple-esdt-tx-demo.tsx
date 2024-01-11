import {
  ESDTType,
  TransactionCallbackParams,
  useConfig,
  useLoggingIn,
  useTokenTransfer,
} from '@useelven/core';
import { shortenHash } from '@/lib/shorten-hash';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ConnectWalletInfo } from '@/components/demo/connect-wallet-info';

const transferAddress = process.env.NEXT_PUBLIC_TRANSFER_ADDRESS || '';

export const SimpleESDTTxDemo = ({
  cb,
}: {
  cb: (params: TransactionCallbackParams) => void;
}) => {
  const { transfer, pending } = useTokenTransfer({ cb });
  const { loggedIn } = useLoggingIn();
  const { explorerAddress, chainType } = useConfig();

  const handleSendTx = () => {
    transfer({
      type: ESDTType.FungibleESDT,
      amount: '1',
      tokenId: 'BUILDO-22c0a5',
      receiver: transferAddress,
    });
  };

  return (
    <Card className="flex flex-1 flex-col justify-between">
      <CardContent className="mt-6">
        <div className="mb-4">
          1. You will be sending 1 BUILDO-22c0a5 to the address: <br />
          <a
            className="font-bold"
            href={`${explorerAddress}/accounts/${transferAddress}`}
            target="_blank"
          >
            {shortenHash(transferAddress, 8)}
          </a>{' '}
          ({chainType})<br />
          You can get some Buildo tokens here:{' '}
          <a
            href="https://r3d4.fr/faucet/"
            target="_blank"
            className="underline"
          >
            r3d4.fr/faucet
          </a>
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
