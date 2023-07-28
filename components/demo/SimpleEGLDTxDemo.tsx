import { Link, Text } from '@chakra-ui/react';
import { TransactionPayload, TokenTransfer } from '@multiversx/sdk-core';
import {
  useTransaction,
  TransactionCallbackParams,
  useConfig,
  useAccount,
} from '@useelven/core';
import { useCallback } from 'react';
import { ActionButton } from '../tools/ActionButton';
import { shortenHash } from '../../utils/shortenHash';
import { FlexCardWrapper } from '../ui/CardWrapper';

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
    const demoMessage = 'Transaction demo!';

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
    <FlexCardWrapper>
      <Text mb={4}>
        1. You will be sending 0.001 EGLD to the address: <br />
        <Link
          href={`${explorerAddress}/accounts/${egldTransferAddress}`}
          fontWeight="bold"
        >
          {shortenHash(egldTransferAddress, 8)}
        </Link>{' '}
        <br />({chainType})
      </Text>
      <ActionButton disabled={pending} onClick={handleSendTx}>
        <Text>Send Transaction</Text>
      </ActionButton>
    </FlexCardWrapper>
  );
};
