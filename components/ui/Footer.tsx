import { Container, Box, Text } from '@chakra-ui/react';
import packageJson from '../../package.json';

export const Footer = () => {
  return (
    <Box
      height="120px"
      bgColor="dappTemplate.dark.darker"
      color="dappTemplate.white"
      display="flex"
      alignItems="center"
    >
      <Container
        maxW="container.xl"
        fontSize="sm"
        fontWeight="normal"
        textAlign="center"
      >
        <Box>Elrond NextJS Dapp Template (v{`${packageJson.version}`})</Box>
        <Box fontSize="xs" fontWeight="hairline">
          All for free. Please support the project. Give it credit and tell the
          world about it. Attribution is not required but welcomed in the form
          of a backlink.
        </Box>
        <Box fontSize="xs" fontWeight="bold">
          <Text
            as="a"
            color="dappTemplate.color3.base"
            href="https://github.com/ElrondDevGuild"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {"Elrond's Dev Guild"}
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
