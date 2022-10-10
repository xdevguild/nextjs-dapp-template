import { Flex, Box, chakra, FlexProps, BoxProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

const FlexWrapper = chakra(Flex, {
  baseStyle: {
    backgroundColor: 'dappTemplate.dark.darker',
    padding: 8,
    borderRadius: '2xl',
    textAlign: 'center',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const FlexCardWrapper: FC<PropsWithChildren<FlexProps>> = ({
  children,
  ...props
}) => {
  return <FlexWrapper {...props}>{children}</FlexWrapper>;
};

const Wrapper = chakra(Box, {
  baseStyle: {
    backgroundColor: 'dappTemplate.dark.darker',
    padding: 8,
    borderRadius: '2xl',
  },
});

export const CardWrapper: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...props
}) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};
