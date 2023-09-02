'use client';

import { TokenTransfer } from '@multiversx/sdk-core';
import Link from 'next/link';
import { shortenHash } from '@/lib/shortenHash';
import { useAccount, useConfig } from '@useelven/core';
import { Card, CardContent } from '@/components/ui/card';

export const GetUserDataDemo = () => {
  const { address, nonce, balance, activeGuardianAddress } = useAccount();
  const { explorerAddress } = useConfig();

  return (
    <Card className="flex-1">
      <CardContent className="mt-6">
        <div className="text-xl mb-2 font-bold">User data:</div>
        <div>
          <span className="inline-block font-bold">address:</span>{' '}
          <Link
            className="underline"
            href={`${explorerAddress}/accounts/${address}`}
          >
            {shortenHash(address, 8)}
          </Link>
        </div>
        <div>
          <span className="inline-block font-bold">guardian:</span>{' '}
          {activeGuardianAddress ? (
            <Link
              className="underline"
              href={`${explorerAddress}/accounts/${address}`}
            >
              {shortenHash(activeGuardianAddress, 8)}
            </Link>
          ) : (
            <span>-</span>
          )}
        </div>
        <div>
          <span className="inline-block font-bold">nonce:</span> {nonce}
        </div>
        <div>
          <span className="inline-block font-bold">balance:</span>{' '}
          {balance
            ? parseFloat(
                TokenTransfer.egldFromBigInteger(balance).toPrettyString()
              )
            : '-'}
        </div>
      </CardContent>
    </Card>
  );
};
