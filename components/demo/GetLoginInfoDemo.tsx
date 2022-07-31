import { Text, Tooltip } from '@chakra-ui/react';
import { FlexCardWrapper } from '../ui/CardWrapper';
import { useLoginInfo } from '../../hooks/auth/useLoginInfo';
import { shortenHash } from '../../utils/shortenHash';

export const GetLoginInfoDemo = () => {
  const { loginMethod, expires, loginToken, signature } = useLoginInfo();

  return (
    <FlexCardWrapper alignItems="flex-start" justifyContent="flex-start">
      <Text fontSize="xl" mb={2} fontWeight="black">
        Login info state:
      </Text>
      <Text>
        <Text as="span" display="inline-block" fontWeight="bold">
          loginMethod:
        </Text>{' '}
        {loginMethod}
      </Text>
      <Text>
        <Text as="span" display="inline-block" fontWeight="bold">
          expires:
        </Text>{' '}
        {expires}
      </Text>
      <Text>
        <Text as="span" display="inline-block" fontWeight="bold">
          loginToken:
        </Text>{' '}
        {loginToken || '-'}
      </Text>
      <Tooltip label={signature}>
        <Text>
          <Text as="span" display="inline-block" fontWeight="bold">
            signature:
          </Text>{' '}
          {signature ? shortenHash(signature, 8) : '-'}
        </Text>
      </Tooltip>
    </FlexCardWrapper>
  );
};
