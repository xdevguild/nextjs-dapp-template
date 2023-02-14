import { useEffect, PropsWithChildren, FC } from 'react';
import { Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useLogin } from '@useelven/core';

interface ProtectedPageWrapper {
  redirectPath?: string;
}

export const ProtectedPageWrapper: FC<
  PropsWithChildren<ProtectedPageWrapper>
> = ({ children, redirectPath = '/' }) => {
  const router = useRouter();
  const { isLoggedIn, isLoggingIn } = useLogin();

  useEffect(() => {
    if (!isLoggingIn && !isLoggedIn) {
      router.push(redirectPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isLoggingIn]);

  if (isLoggingIn) {
    return (
      <Stack
        width="100vw"
        height="100vh"
        flex={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Stack>
    );
  }

  if (!isLoggingIn && !isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};
