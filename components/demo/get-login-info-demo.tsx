'use client';

import { useLoginInfo } from '@useelven/core';
import { shortenHash } from '@/lib/shorten-hash';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';

export const GetLoginInfoDemo = () => {
  const { loginMethod, expires, loginToken, signature } = useLoginInfo();

  return (
    <Card className="flex-1">
      <CardContent className="mt-6">
        <div className="text-xl mb-2 font-bold">Login info state:</div>
        <div>
          <span className="inline-block font-bold">loginMethod:</span>{' '}
          {loginMethod}
        </div>
        <div>
          <span className="inline-block font-bold">expires:</span> {expires}
        </div>
        <div>
          <span className="inline-block font-bold">loginToken:</span>
          {loginToken ? (
            <div className="break-all text-left">{loginToken}</div>
          ) : (
            '-'
          )}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div>
                <span className="inline-block font-bold">signature:</span>{' '}
                {signature ? shortenHash(signature, 8) : '-'}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{signature}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};
