import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Flex,
  ModalHeader,
  Stack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useLogin, useLoginInfo, useLogout } from '@useelven/core';
import { ActionButton } from '../tools/ActionButton';
import { LoginComponent } from '../tools/LoginComponent';
import { useEffectOnlyOnUpdate } from '../../hooks/useEffectOnlyOnUpdate';
import { getLoginMethodDeviceName } from '../../utils/getSigningDeviceName';

interface LoginModalButtonProps {
  onClose?: () => void;
  onOpen?: () => void;
}

const CustomModalOverlay = () => {
  return <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />;
};

export const LoginModalButton: FC<LoginModalButtonProps> = ({
  onClose,
  onOpen,
}) => {
  const { isLoggedIn, isLoggingIn, setLoggingInState } = useLogin();
  const { loginMethod } = useLoginInfo();
  const { logout } = useLogout();
  const {
    isOpen: opened,
    onOpen: open,
    onClose: close,
  } = useDisclosure({ onClose, onOpen });

  useEffectOnlyOnUpdate(() => {
    if (isLoggedIn) {
      close();
    }
  }, [isLoggedIn]);

  const onCloseComplete = () => {
    setLoggingInState('error', '');
  };

  const ledgerOrPortalName = getLoginMethodDeviceName(loginMethod);

  return (
    <>
      {isLoggedIn ? (
        <ActionButton onClick={logout}>Disconnect</ActionButton>
      ) : (
        <ActionButton onClick={open}>
          {isLoggingIn ? 'Connecting...' : 'Connect'}
        </ActionButton>
      )}
      <Modal
        isOpen={opened}
        size="sm"
        onClose={close}
        isCentered
        scrollBehavior="inside"
        onCloseComplete={onCloseComplete}
      >
        <CustomModalOverlay />
        <ModalContent
          bgColor="dappTemplate.dark.darker"
          px={6}
          pt={7}
          pb={10}
          position="relative"
        >
          <ModalCloseButton _focus={{ outline: 'none' }} />
          <ModalHeader>
            <Text textAlign="center" fontWeight="black" fontSize="2xl">
              Connect your wallet
            </Text>
          </ModalHeader>
          <ModalBody>
            {isLoggingIn && (
              <Flex
                alignItems="center"
                backdropFilter="blur(3px)"
                bgColor="blackAlpha.700"
                justifyContent="center"
                position="absolute"
                zIndex="overlay"
                inset={0}
              >
                <Stack alignItems="center">
                  {ledgerOrPortalName ? (
                    <>
                      <Text fontSize="lg">Confirmation required</Text>
                      <Text fontSize="sm">Approve on {ledgerOrPortalName}</Text>
                    </>
                  ) : null}
                  <Spinner
                    thickness="3px"
                    speed="0.4s"
                    color="dappTemplate.color2.base"
                    size="xl"
                  />
                </Stack>
              </Flex>
            )}
            <LoginComponent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
