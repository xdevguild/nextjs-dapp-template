import { TokenTransfer } from '@multiversx/sdk-core';
import { Text, Link } from '@chakra-ui/react';
import { shortenHash } from '../../utils/shortenHash';
import { useAccount, useConfig } from '@useelven/core';
import { FlexCardWrapper } from '../ui/CardWrapper';
import { CardItemWrapper } from './CardItemWrapper';

export const GetUserDataDemo = () => {
  const { address, nonce, balance } = useAccount();
  const { explorerAddress } = useConfig();

  return (
    <FlexCardWrapper alignItems="flex-start" justifyContent="flex-start">
      <Text fontSize="xl" mb={2} fontWeight="black">
        User data:
      </Text>
      <CardItemWrapper>
        <Text as="span" display="inline-block" fontWeight="bold">
          address:
        </Text>{' '}
        <Link
          textDecoration="underline"
          href={`${explorerAddress}/accounts/${address}`}
        >
          {shortenHash(address, 8)}
        </Link>
      </CardItemWrapper>
      <CardItemWrapper>
        <Text as="span" display="inline-block" fontWeight="bold">
          nonce:
        </Text>{' '}
        {nonce}
      </CardItemWrapper>
      <CardItemWrapper>
        <Text as="span" display="inline-block" fontWeight="bold">
          balance:
        </Text>{' '}
        {balance
          ? parseFloat(
              TokenTransfer.egldFromBigInteger(balance).toPrettyString()
            )
          : '-'}
      </CardItemWrapper>
    </FlexCardWrapper>
  );
};
