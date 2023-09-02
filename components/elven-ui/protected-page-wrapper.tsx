import { useEffect, PropsWithChildren, FC } from 'react';
import { useRouter } from 'next/router';
import { useLogin } from '@useelven/core';
import { Spinner } from '@/components/ui/spinner';

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
      <div className="flex-1 flex-row items-center justify-center h-screen w-screen">
        <Spinner />
      </div>
    );
  }

  if (!isLoggingIn && !isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};
