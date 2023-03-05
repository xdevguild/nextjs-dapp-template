// Login component wraps all auth services in one place
// You can always use only one of them if needed
import { useCallback, memo, useState } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useLogin, LoginMethodsEnum } from '@useelven/core';
import { WalletConnectQRCode } from './WalletConnectQRCode';
import { WalletConnectPairings } from './WalletConnectPairings';
import { ActionButton } from './ActionButton';
import { LedgerAccountsList } from './LedgerAccountsList';

export const LoginComponent = memo(() => {
  // If you need the auth signature and token pas your unique token in useLogin
  // all auth providers will return the signature, it will be saved in localstorage and global state
  // For the demo purposes here is a dummy token
  const {
    login,
    isLoggedIn,
    error,
    walletConnectUri,
    getHWAccounts,
    walletConnectPairingLogin,
    walletConnectPairings,
    walletConnectRemovePairing,
    setLoggingInState,
  } = useLogin({ token: 'token_just_for_testing_purposes' });

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

  const backToOptions = useCallback(() => {
    setLoggingInState('error', '');
  }, [setLoggingInState]);

  if (error)
    return (
      <Stack>
        <Box textAlign="center">{error}</Box>
        <ActionButton isFullWidth onClick={backToOptions}>
          Back
        </ActionButton>
      </Stack>
    );

  return (
    <>
      <Stack spacing={4} direction="column" align="center">
        {!isLoggedIn && (
          <>
            <ActionButton
              isFullWidth
              onClick={handleLogin(LoginMethodsEnum.wallet)}
            >
              MultiversX Web Wallet
            </ActionButton>
            <ActionButton
              isFullWidth
              onClick={handleLogin(LoginMethodsEnum.extension)}
            >
              MultiversX Browser Extension
            </ActionButton>
            <ActionButton
              isFullWidth
              onClick={handleLogin(LoginMethodsEnum.walletconnect)}
            >
              xPortal Mobile App
            </ActionButton>
            <ActionButton isFullWidth onClick={handleLedgerAccountsList}>
              Ledger
            </ActionButton>
          </>
        )}
      </Stack>
      {loginMethod === LoginMethodsEnum.walletconnect && walletConnectUri && (
        <Box mt={5}>
          <WalletConnectQRCode uri={walletConnectUri} />
        </Box>
      )}
      {loginMethod === LoginMethodsEnum.walletconnect &&
        walletConnectPairings &&
        walletConnectPairings.length > 0 && (
          <WalletConnectPairings
            pairings={walletConnectPairings}
            login={walletConnectPairingLogin}
            remove={walletConnectRemovePairing}
          />
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
