import { FC, MouseEventHandler, useState } from 'react';
import { PairingTypes } from '@useelven/core';
import { Stack, Box, Text, Heading, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface WalletConnectPairingsProps {
  pairings: PairingTypes.Struct[];
  login: (topic: string) => Promise<void>;
  remove: (topic: string) => Promise<void>;
}

export const WalletConnectPairings: FC<WalletConnectPairingsProps> = ({
  pairings,
  login,
  remove,
}) => {
  const handleLogin = (topic: string) => () => {
    login(topic);
  };

  const [localPairings, setLocalPairings] = useState<PairingTypes.Struct[]>(pairings);

  const handleRemove = (topic: string) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await remove(topic);
    setLocalPairings(localPairings.filter((pairing) => pairing.topic !== topic));
  };

  return (
    <Stack>
      {
        localPairings.length > 0 && (
          <Heading size="md" mt={4}>
            Existing pairings:
          </Heading>
      )}
      {localPairings.map((pairing) => (
        <Box
          bgColor="dappTemplate.white"
          py={2}
          px={4}
          pr={8}
          borderRadius="md"
          key={pairing.topic}
          cursor="pointer"
          onClick={handleLogin(pairing.topic)}
          userSelect="none"
          position="relative"
        >
          <IconButton
            position="absolute"
            top={2}
            right={2}
            aria-label="remove-pairing"
            color="dappTemplate.dark.base"
            h={6}
            minW={6}
            icon={<CloseIcon boxSize={2} />}
            onClick={handleRemove(pairing.topic)}
          />
          <Text fontSize="lg" color="dappTemplate.dark.base">
            {pairing.peerMetadata?.name}
          </Text>
          {pairing.peerMetadata?.url ? (
            <Text fontSize="xs" color="dappTemplate.dark.base">
              ({pairing.peerMetadata.url})
            </Text>
          ) : null}
        </Box>
      ))}
    </Stack>
  );
};
