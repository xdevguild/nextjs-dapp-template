'use client';

import { FC, ReactElement, PropsWithChildren } from 'react';
import { useLoggingIn } from '@useelven/core';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

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
  ...props
}) => {
  const { pending, loggedIn } = useLoggingIn();

  if (pending)
    return noSpinner ? null : (
      <div
        className={cn(['flex flex-row', { 'justify-center': spinnerCentered }])}
        {...props}
      >
        <Spinner />
      </div>
    );

  if (!loggedIn) return fallback;

  return <>{children}</>;
};
