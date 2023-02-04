import { TokenPayment } from '@multiversx/sdk-core';
import { Text, Link } from '@chakra-ui/react';
import { shortenHash } from '../../utils/shortenHash';
import { useAccount } from '../../hooks/auth/useAccount';
import { FlexCardWrapper } from '../ui/CardWrapper';
import { networkConfig, chainType } from '../../config/network';
import { CardItemWrapper } from './CardItemWrapper';

export const GetUserDataDemo = () => {
  const { address, nonce, balance } = useAccount();

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
          href={`${networkConfig[chainType].explorerAddress}/accounts/${address}`}
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
              TokenPayment.egldFromBigInteger(balance).toRationalNumber()
            )
          : '-'}
      </CardItemWrapper>
    </FlexCardWrapper>
  );
};
