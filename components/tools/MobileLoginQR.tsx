import { useEffect, useState, FunctionComponent } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { networkConfig, chainType } from '../../config/network';
import { isMobile } from '../../utils/isMobile';
import QRCode from 'qrcode';

interface MobileLoginQRProps {
  walletConnectUri: string;
}

export const MobileLoginQR: FunctionComponent<MobileLoginQRProps> = ({
  walletConnectUri,
}) => {
  const [qrCodeSvg, setQrCodeSvg] = useState('');

  useEffect(() => {
    const generateQRCode = async () => {
      if (!walletConnectUri) {
        return;
      }

      const svg = await QRCode.toString(walletConnectUri, {
        type: 'svg',
      });

      setQrCodeSvg(svg);
    };
    generateQRCode();
  }, [walletConnectUri]);

  const mobile = isMobile();

  return (
    <Box>
      <Box
        sx={{
          svg: {
            borderRadius: 'xl',
          },
        }}
        dangerouslySetInnerHTML={{
          __html: qrCodeSvg,
        }}
      />
      {mobile ? (
        <Flex justifyContent="center">
          <Box
            width="100%"
            textAlign="center"
            color="dappTemplate.white"
            borderColor="dappTemplate.color2.base"
            borderWidth={2}
            borderRadius="lg"
            py={2}
            px={6}
            mt={6}
            fontWeight="normal"
            _hover={{ bg: 'dappTemplate.color2.darker' }}
            transition="background-color .3s"
            as="a"
            href={`${
              networkConfig[chainType]?.walletConnectDeepLink
            }?wallet-connect=${encodeURIComponent(walletConnectUri)}`}
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            xPortal Login
          </Box>
        </Flex>
      ) : null}
    </Box>
  );
};
