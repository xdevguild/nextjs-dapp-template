import {
  U32Value,
  ContractFunction,
  ContractCallPayloadBuilder,
  TokenTransfer,
} from '@multiversx/sdk-core';
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

const mintSmartContractAddress =
  process.env.NEXT_PUBLIC_MINT_SMART_CONTRACT_ADDRESS || '';
const mintFunctionName = process.env.NEXT_PUBLIC_MINT_FUNCTION_NAME || '';
const mintPaymentPerToken =
  process.env.NEXT_PUBLIC_MINT_PAYMENT_PER_TOKEN || '';

export const SimpleNftMintDemo = ({
  cb,
}: {
  cb: (params: TransactionCallbackParams) => void;
}) => {
  const { pending, triggerTx } = useTransaction({ cb });
  const { activeGuardianAddress } = useAccount();
  const { explorerAddress, chainType } = useConfig();

  const handleSendTx = useCallback(() => {
    // Prepare data payload for smart contract using MultiversX JS SDK core tools
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction(mintFunctionName))
      .setArgs([new U32Value(1)])
      .build();

    let gasLimit = 14000000;

    if (activeGuardianAddress) {
      gasLimit = gasLimit + 50000;
    }

    triggerTx({
      address: mintSmartContractAddress,
      gasLimit,
      value: TokenTransfer.egldFromAmount(mintPaymentPerToken),
      data,
    });
  }, [activeGuardianAddress, triggerTx]);

  return (
    <Card className="flex-1">
      <CardContent className="mt-6">
        <div className="mb-4">
          2. You will be minting one NFT using{' '}
          <a href="https://www.elven.tools">Elven Tools</a> smart contract:{' '}
          <br />
          <a
            href={`${explorerAddress}/accounts/${mintSmartContractAddress}`}
            className="font-bold"
            target="_blank"
          >
            {shortenHash(mintSmartContractAddress, 8)}
          </a>{' '}
          <br />({chainType}, max 10 NFTs per address)
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" disabled={pending} onClick={handleSendTx}>
          Mint
        </Button>
      </CardFooter>
    </Card>
  );
};
