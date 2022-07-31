import { FC, ReactElement, PropsWithChildren } from 'react';
import { Spinner, Flex } from '@chakra-ui/react';
import { useLoggingIn } from '../../hooks/auth/useLoggingIn';

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
  const { isLoggingIn, isLoggedIn } = useLoggingIn();

  if (isLoggingIn)
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

  if (!isLoggedIn) return fallback;

  return <>{children}</>;
};
