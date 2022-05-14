import { TokenPayment } from '@elrondnetwork/erdjs/out';
import { Text, Link } from '@chakra-ui/react';
import { shortenHash } from '../../utils/shortenHash';
import { useAccount } from '../../hooks/auth/useAccount';
import { FlexCardWrapper } from '../ui/CardWrapper';
import { networkConfig, chainType } from '../../config/network';

export const GetUserDataDemo = () => {
  const { address, nonce, balance } = useAccount();

  return (
    <FlexCardWrapper alignItems="flex-start" justifyContent="flex-start">
      <Text fontSize="xl" mb={2} fontWeight="black">
        User data:
      </Text>
      <Text>
        <Text display="inline-block" fontWeight="bold">
          address:
        </Text>{' '}
        <Link
          textDecoration="underline"
          href={`${networkConfig[chainType].explorerAddress}/accounts/${address}`}
        >
          {shortenHash(address, 8)}
        </Link>
      </Text>
      <Text>
        <Text display="inline-block" fontWeight="bold">
          nonce:
        </Text>{' '}
        {nonce}
      </Text>
      <Text>
        <Text display="inline-block" fontWeight="bold">
          balance:
        </Text>{' '}
        {balance
          ? parseFloat(
              TokenPayment.egldFromBigInteger(balance).toRationalNumber()
            )
          : '-'}
      </Text>
    </FlexCardWrapper>
  );
};
