import { Text } from '@chakra-ui/react';
import { FlexCardWrapper } from '../ui/CardWrapper';
import { useLoggingIn } from '@useelven/core';
import { CardItemWrapper } from './CardItemWrapper';

export const GetLoggingInStateDemo = () => {
  const { pending, error, loggedIn } = useLoggingIn();

  return (
    <FlexCardWrapper alignItems="flex-start" justifyContent="flex-start">
      <Text fontSize="xl" mb={2} fontWeight="black">
        Logging in current state:
      </Text>
      <CardItemWrapper>
        <Text as="span" display="inline-block" fontWeight="bold">
          isLoggingIn:
        </Text>{' '}
        {pending ? 'true' : 'false'}
      </CardItemWrapper>
      <CardItemWrapper>
        <Text as="span" display="inline-block" fontWeight="bold">
          error:
        </Text>{' '}
        {error || '-'}
      </CardItemWrapper>
      <CardItemWrapper>
        <Text as="span" display="inline-block" fontWeight="bold">
          isLoggedIn:
        </Text>{' '}
        {loggedIn ? 'true' : 'false'}
      </CardItemWrapper>
    </FlexCardWrapper>
  );
};
