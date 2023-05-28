import { FC, useCallback, useState, useEffect, useRef } from 'react';
import { Box, Text, Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { LoginMethodsEnum, useLoginInfo } from '@useelven/core';
import { ActionButton } from './ActionButton';
import { shortenHash } from '../../utils/shortenHash';
import { errorParse } from '../../utils/errorParse';

interface LedgerAccountsListProps {
  getHWAccounts: (page?: number, pageSize?: number) => Promise<string[]>;
  resetLoginMethod: () => void;
  handleLogin: (
    type: LoginMethodsEnum,
    ledgerAccountsIndex?: number
  ) => () => void;
}

const ADDRESSES_PER_PAGE = 10;
const LEDGER_NOT_CONNECTED_CODE = 0x6e01;
const LEDGER_DISCONNECTED = 'DisconnectedDeviceDuringOperation';

export const LedgerAccountsList: FC<LedgerAccountsListProps> = ({
  getHWAccounts,
  resetLoginMethod,
  handleLogin,
}) => {
  const [accounts, setAccounts] = useState<string[]>();
  const [listPending, setListPending] = useState(true);
  const [error, setError] = useState<string>();
  const [chosenAddress, setAddress] = useState<string>();

  const { loginToken } = useLoginInfo();

  const router = useRouter();

  const getAccounts = async (page: number) =>
    await getHWAccounts(page, ADDRESSES_PER_PAGE);

  const handleAccounts = async (page: number) => {
    const accountsResult = await getAccounts(page);
    if (accountsResult?.length > 0) setAccounts(accountsResult);
  };

  const handleErrors = (e: unknown) => {
    const err = e as { statusCode: number; name: string };
    if (
      err.statusCode === LEDGER_NOT_CONNECTED_CODE ||
      err.name === LEDGER_DISCONNECTED
    ) {
      setError(
        'Not connected, please check the connection and make sure that you have the MultiversX app opened on your Ledger device.'
      );
    } else {
      setError(`Error: ${errorParse(e)}`);
    }
  };

  const fetchedOnce = useRef<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      setListPending(true);
      try {
        await handleAccounts(0);
      } catch (e) {
        handleErrors(e);
      } finally {
        setListPending(false);
      }
    };
    if (!fetchedOnce.current) fetch();
    return () => {
      fetchedOnce.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentPage = useRef<number>(0);

  const handlePrev = useCallback(async () => {
    setListPending(true);
    try {
      const prevPage =
        currentPage.current > 0 ? currentPage.current - 1 : currentPage.current;
      currentPage.current = prevPage;
      await handleAccounts(prevPage);
    } catch (e) {
      handleErrors(e);
    } finally {
      setListPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = useCallback(async () => {
    setListPending(true);
    try {
      const nextPage = currentPage.current + 1;
      currentPage.current = nextPage;
      await handleAccounts(nextPage);
    } catch (e) {
      handleErrors(e);
    } finally {
      setListPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = useCallback(() => {
    router.reload();
  }, [router]);

  const login = useCallback(
    (index: number, address: string) => () => {
      handleLogin(LoginMethodsEnum.ledger, index)();
      setAddress(address);
    },
    [handleLogin]
  );

  useEffect(() => {
    if (!listPending && !accounts && !error) {
      resetLoginMethod();
    }
  }, [accounts, error, listPending, resetLoginMethod]);

  if (listPending) {
    return (
      <Flex justify="center" align="center" marginTop={6} direction="column">
        <Spinner color="elvenTools.color2.base" />
        <Box marginTop={3}>Loading addresses, please wait...</Box>
      </Flex>
    );
  }

  if (error) {
    return (
      <Box
        textAlign="center"
        marginLeft="auto"
        marginRight="auto"
        marginTop={6}
      >
        <Text>{error}</Text>
        <ActionButton mt={4} onClick={handleRefresh}>
          Refresh
        </ActionButton>
      </Box>
    );
  }

  if (!accounts) return null;

  if (chosenAddress)
    return (
      <Flex justify="center" align="center" marginTop={6} direction="column">
        <Spinner color="elvenTools.color2.base" />
        <Box marginTop={3}>Confirm on the Ledger device:</Box>
        <Box marginTop={3} wordBreak="break-word" textAlign="center">
          <Box fontWeight="bold">Address:</Box> {chosenAddress}
        </Box>
        {loginToken && (
          <Box mt={3}>
            <Box fontWeight="bold" textAlign="center">Login token:</Box> 
            <Box wordBreak="break-word">{loginToken}</Box>
          </Box>
        )}
      </Flex>
    );

  return (
    <Box marginLeft="auto" marginRight="auto" marginTop={6}>
      <Text fontWeight="semibold" textAlign="center" mb={2}>
        Choose address:
      </Text>
      {accounts?.map((account: string, index: number) => (
        <Box
          key={account}
          marginBottom={0.5}
          cursor="pointer"
          border="1px solid transparent"
          borderRadius="md"
          _hover={{ border: '1px dotted #fff', paddingLeft: 2 }}
          transition="padding-left 0.2s"
          padding={1}
          onClick={login(index, account)}
        >
          <Box as="span" display="inline-block" textAlign="center" minWidth={4}>
            {index + currentPage.current * ADDRESSES_PER_PAGE}
          </Box>
          :
          <Box
            as="span"
            display="inline-block"
            marginLeft={4}
            textAlign="center"
          >
            {shortenHash(account, 11)}
          </Box>
        </Box>
      ))}
      <Flex justifyContent="space-between" marginTop={6}>
        <Text
          onClick={handlePrev}
          cursor={currentPage.current === 0 ? 'not-allowed' : 'pointer'}
          opacity={currentPage.current === 0 ? 0.5 : 1}
        >
          Prev
        </Text>
        <Text onClick={handleNext} cursor="pointer">
          Next
        </Text>
      </Flex>
    </Box>
  );
};
