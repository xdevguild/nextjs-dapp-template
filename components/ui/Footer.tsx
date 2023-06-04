import { Container, Box, Text, Stack } from '@chakra-ui/react';
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
        <Box>MultiversX NextJS Dapp Template (v{`${packageJson.version}`})</Box>
        <Box fontSize="xs" fontWeight="hairline">
          All for free. Please support the project. Give it credit and tell the
          world about it. Attribution is not required but welcomed in the form
          of a backlink.
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          fontSize="xs"
          fontWeight="bold"
        >
          <Text
            as="a"
            color="dappTemplate.color3.base"
            href="https://github.com/xdevguild"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {'xDevGuild'}
          </Text>
          <Text fontWeight="hairline"> | </Text>
          <Text
            as="a"
            color="dappTemplate.color3.base"
            href="https://github.com/ElvenTools"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {'Elven Tools'}
          </Text>
          <Text fontWeight="hairline"> | </Text>
          <Text
            as="a"
            color="dappTemplate.color3.base"
            href="https://github.com/elven-js/elven.js"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {'Elven.js'}
          </Text>
          <Text fontWeight="hairline"> | </Text>
          <Text
            as="a"
            color="dappTemplate.color3.base"
            href="https://github.com/xdevguild/buildo-begins"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {'Buildo Begins'}
          </Text>
          <Text fontWeight="hairline"> | </Text>
          <Text
            as="a"
            color="dappTemplate.color3.base"
            href="https://www.julian.io"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {'julian.io'}
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};
