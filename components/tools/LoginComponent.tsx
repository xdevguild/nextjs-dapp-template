// Login component wraps all auth services in one place
// You can always use only one of them if needed
import { useCallback, memo, useState } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useLogin } from '../../hooks/auth/useLogin';
import { LoginMethodsEnum } from '../../types/enums';
import { MobileLoginQR } from './MobileLoginQR';
import { ActionButton } from './ActionButton';
import { LedgerAccountsList } from './LedgerAccountsList';

export const LoginComponent = memo(() => {
  // If you need the auth signature and token you can pass it here
  // example: const { ... } = useLogin({ token: "some_hash_here" })
  // all auth providers will return the signature, it will be saved in localstorage and global state
  const { login, isLoggedIn, error, walletConnectUri, getHWAccounts } =
    useLogin();

  const [loginMethod, setLoginMethod] = useState<LoginMethodsEnum>();

  const handleLogin = useCallback(
    (type: LoginMethodsEnum, ledgerAccountsIndex?: number) => () => {
      setLoginMethod(type);
      login(type, ledgerAccountsIndex);
    },
    [login]
  );

  const handleLedgerAccountsList = useCallback(() => {
    setLoginMethod(LoginMethodsEnum.ledger);
  }, []);

  const resetLoginMethod = useCallback(() => {
    setLoginMethod(undefined);
  }, []);

  if (error) return <Box textAlign="center">{error}</Box>;

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
            <ActionButton isFullWidth onClick={handleLedgerAccountsList}>
              Ledger
            </ActionButton>
          </>
        )}
      </Stack>
      {loginMethod === LoginMethodsEnum.walletconnect && walletConnectUri && (
        <Box mt={5}>
          <MobileLoginQR walletConnectUri={walletConnectUri} />
        </Box>
      )}
      {loginMethod === LoginMethodsEnum.ledger && (
        <LedgerAccountsList
          getHWAccounts={getHWAccounts}
          resetLoginMethod={resetLoginMethod}
          handleLogin={handleLogin}
        />
      )}
    </>
  );
});

LoginComponent.displayName = 'LoginComponent';
