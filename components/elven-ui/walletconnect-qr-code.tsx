import { useEffect, useState, FunctionComponent } from 'react';
import { useConfig } from '@useelven/core';
import { isMobile } from '@/lib/isMobile';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';

interface WalletConnectQRCodeProps {
  uri: string;
}

export const WalletConnectQRCode: FunctionComponent<
  WalletConnectQRCodeProps
> = ({ uri }) => {
  const [qrCodeSvg, setQrCodeSvg] = useState('');
  const { walletConnectDeepLink } = useConfig();

  useEffect(() => {
    const generateQRCode = async () => {
      if (!uri) {
        setQrCodeSvg('<div>dupa</div>');
        return;
      }

      const svg = await QRCode.toString(uri, {
        type: 'svg',
      });

      setQrCodeSvg(svg);
    };
    generateQRCode();
  }, [uri]);

  const mobile = isMobile();

  return (
    <div>
      <div
        className="[&>svg]:rounded-xl [&>svg]:max-w-xs [&>svg]:mx-auto"
        dangerouslySetInnerHTML={{
          __html: qrCodeSvg,
        }}
      />
      {mobile ? (
        <div className="justify-center">
          <Button asChild>
            <a
              href={`${walletConnectDeepLink}?wallet-connect=${encodeURIComponent(
                uri
              )}`}
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              xPortal Login
            </a>
          </Button>
        </div>
      ) : null}
    </div>
  );
};
