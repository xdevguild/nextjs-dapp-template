import { Text } from '@chakra-ui/react';
import { FlexCardWrapper } from '../ui/CardWrapper';
import { useLoggingIn } from '../../hooks/auth/useLoggingIn';

export const GetLoggingInStateDemo = () => {
  const { isLoggingIn, error, isLoggedIn } = useLoggingIn();

  return (
    <FlexCardWrapper alignItems="flex-start" justifyContent="flex-start">
      <Text fontSize="xl" mb={2} fontWeight="black">
        Logging in current state:
      </Text>
      <Text>
        <Text as="span" display="inline-block" fontWeight="bold">
          isLoggingIn:
        </Text>{' '}
        {isLoggingIn ? 'true' : 'false'}
      </Text>
      <Text>
        <Text as="span" display="inline-block" fontWeight="bold">
          error:
        </Text>{' '}
        {error}
      </Text>
      <Text>
        <Text as="span" display="inline-block" fontWeight="bold">
          isLoggedIn:
        </Text>{' '}
        {isLoggedIn ? 'true' : 'false'}
      </Text>
    </FlexCardWrapper>
  );
};
