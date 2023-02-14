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
} from '@chakra-ui/react';
import { FC } from 'react';
import { useLogin, useLogout } from '@useelven/core';
import { ActionButton } from '../tools/ActionButton';
import { LoginComponent } from '../tools/LoginComponent';
import { useEffectOnlyOnUpdate } from '../../hooks/useEffectOnlyOnUpdate';

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
  const { isLoggedIn, isLoggingIn } = useLogin();
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

  return (
    <>
      {isLoggedIn ? (
        <ActionButton onClick={logout}>Disconnect</ActionButton>
      ) : (
        <ActionButton onClick={open}>
          {isLoggingIn ? 'Connecting...' : 'Connect'}
        </ActionButton>
      )}
      <Modal isOpen={opened} size="sm" onClose={close} isCentered>
        <CustomModalOverlay />
        <ModalContent
          bgColor="dappTemplate.dark.darker"
          px={6}
          pt={7}
          pb={10}
          position="relative"
        >
          <ModalCloseButton _focus={{ outline: 'none' }} />
          <ModalBody>
            <Text textAlign="center" mb={7} fontWeight="black" fontSize="2xl">
              Connect your wallet
            </Text>
            {isLoggingIn && (
              <Flex
                alignItems="center"
                backdropFilter="blur(3px)"
                bgColor="blackAlpha.700"
                justifyContent="center"
                position="absolute"
                inset={0}
              >
                <Spinner
                  thickness="3px"
                  speed="0.4s"
                  color="dappTemplate.color2.base"
                  size="xl"
                />
              </Flex>
            )}
            <LoginComponent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
