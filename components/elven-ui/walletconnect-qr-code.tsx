import { useEffect, useState, FunctionComponent } from 'react';
import { useConfig } from '@useelven/core';
import { isMobile } from '@/lib/is-mobile';
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
      {mobile ? (
        <div className="flex justify-center w-full mb-6">
          <Button asChild>
            <a
              href={`${walletConnectDeepLink}?wallet-connect=${encodeURIComponent(
                uri
              )}`}
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              Go to xPortal to sign in!
            </a>
          </Button>
        </div>
      ) : null}
      <div
        className="[&>svg]:rounded-xl [&>svg]:max-w-xs [&>svg]:mx-auto [&>svg]:border [&>svg]:border-solid [&>svg]:border-zinc-300 dark:[&>svg]:border-0"
        {...(qrCodeSvg
          ? { dangerouslySetInnerHTML: { __html: qrCodeSvg } }
          : {})}
      />
    </div>
  );
};
