import { Link, Text } from '@chakra-ui/react';
import { U32Value, ContractFunction } from '@elrondnetwork/erdjs';
import { useScTransaction } from '../../hooks/core/useScTransaction';
import { useCallback } from 'react';
import { ActionButton } from '../tools/ActionButton';
import { networkConfig, chainType } from '../../config/network';
import {
  mintSmartContractAddress,
  mintFunctionName,
} from '../../config/demo-settings';
import { shortenHash } from '../../utils/shortenHash';
import { FlexCardWrapper } from '../ui/CardWrapper';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';

export const SimpleNftMintDemo = ({
  cb,
}: {
  cb: (params: TransactionCb) => void;
}) => {
  const { pending, triggerTx, transaction, error } = useScTransaction({ cb });

  const handleSendTx = useCallback(() => {
    triggerTx({
      smartContractAddress: mintSmartContractAddress,
      func: new ContractFunction(mintFunctionName),
      gasLimit: 14000000,
      args: [new U32Value(1)],
      value: 0.001,
    });
  }, [triggerTx]);

  return (
    <FlexCardWrapper>
      <Text mb={4}>
        2. You will be minting one NFT using smart contract: <br />
        <Link
          href={`${networkConfig[chainType].explorerAddress}/accounts/${mintSmartContractAddress}`}
          fontWeight="bold"
        >
          {shortenHash(mintSmartContractAddress, 8)}
        </Link>{' '}
        <br />
        (devnet, max 3 NFTs per address)
      </Text>
      <ActionButton disabled={pending} onClick={handleSendTx}>
        <Text>Mint</Text>
      </ActionButton>
    </FlexCardWrapper>
  );
};
