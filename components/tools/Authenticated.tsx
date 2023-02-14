import { FC, ReactElement, PropsWithChildren } from 'react';
import { Spinner, Flex } from '@chakra-ui/react';
import { useLoggingIn } from '@useelven/core';

interface AuthenticatedProps {
  fallback?: ReactElement;
  noSpinner?: boolean;
  spinnerCentered?: boolean;
}

export const Authenticated: FC<PropsWithChildren<AuthenticatedProps>> = ({
  children,
  fallback = null,
  noSpinner = false,
  spinnerCentered = false,
}) => {
  const { pending, loggedIn } = useLoggingIn();

  if (pending)
    return noSpinner ? null : (
      <Flex justify={spinnerCentered ? 'center' : 'flex-start'}>
        <Spinner
          thickness="3px"
          speed="0.4s"
          color="elvenTools.color2.base"
          size="md"
          mt={3}
        />
      </Flex>
    );

  if (!loggedIn) return fallback;

  return <>{children}</>;
};
