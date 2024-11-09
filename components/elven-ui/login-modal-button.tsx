'use client';

import { FC, useState } from 'react';
import { useLogin, useLogout } from '@useelven/core';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LoginComponent } from './login-component';
import { useEffectOnlyOnUpdate } from '@/hooks/use-effect-only-on-update';

interface LoginModalButtonProps {
  onClose?: () => void;
  onOpen?: () => void;
}

export const LoginModalButton: FC<LoginModalButtonProps> = ({
  onClose,
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, isLoggingIn, setLoggingInState } = useLogin();

  const { logout } = useLogout();

  useEffectOnlyOnUpdate(() => {
    if (isLoggedIn) {
      setIsOpen(false);
      onClose?.();
    }
  }, [isLoggedIn]);

  const onCloseComplete = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      setTimeout(() => {
        setLoggingInState('error', '');
      }, 1000);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    onOpen?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseComplete}>
      {isLoggedIn ? (
        <Button variant="outline" onClick={() => logout()}>
          Disconnect
        </Button>
      ) : (
        <Button variant="outline" onClick={handleOpen}>
          {isLoggingIn ? 'Connecting...' : 'Connect'}
        </Button>
      )}
      <DialogContent className="max-w-xs sm:max-w-lg bg-white dark:bg-zinc-950 p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Connect your wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 overflow-y-auto max-h-[calc(100vh-160px)] px-6 pb-12 pt-6">
          <LoginComponent />
        </div>
      </DialogContent>
    </Dialog>
  );
};
