// Login component wraps all auth services in one place
// You can always use only one of them if needed
import { useCallback, memo } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useLogin } from '../../hooks/auth/useLogin';
import { LoginMethodsEnum } from '../../types/enums';
import { MobileLoginQR } from './MobileLoginQR';
import { ActionButton } from './ActionButton';

export const LoginComponent = memo(() => {
  const { login, isLoggedIn, error, walletConnectUri } = useLogin();

  const handleLogin = useCallback(
    (type: LoginMethodsEnum) => () => {
      login(type);
    },
    [login]
  );

  if (error) return <div>{error}</div>;

  return (
    <>
      <Stack spacing={4} direction="column" align="center">
        {!isLoggedIn && (
          <>
            <ActionButton
              isFullWidth
              onClick={handleLogin(LoginMethodsEnum.wallet)}
            >
              Elrond Web Wallet
            </ActionButton>
            <ActionButton
              isFullWidth
              onClick={handleLogin(LoginMethodsEnum.extension)}
            >
              Maiar Browser Extension
            </ActionButton>
            <ActionButton
              isFullWidth
              onClick={handleLogin(LoginMethodsEnum.walletconnect)}
            >
              Maiar Mobile App
            </ActionButton>
          </>
        )}
      </Stack>
      {walletConnectUri && (
        <Box mt={5}>
          <MobileLoginQR walletConnectUri={walletConnectUri} />
        </Box>
      )}
    </>
  );
});

LoginComponent.displayName = 'LoginComponent';
