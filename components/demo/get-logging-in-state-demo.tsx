'use client';

import { useLoggingIn } from '@useelven/core';
import { Card, CardContent } from '@/components/ui/card';

export const GetLoggingInStateDemo = () => {
  const { pending, error, loggedIn } = useLoggingIn();

  return (
    <Card className="flex-1">
      <CardContent className="mt-6">
        <div className="text-xl mb-2 font-bold">Logging in current state:</div>
        <div>
          <span className="inline-block font-bold">isLoggingIn:</span>{' '}
          {pending ? 'true' : 'false'}
        </div>
        <div>
          <span className="inline-block font-bold">error:</span> {error || '-'}
        </div>
        <div>
          <span className="inline-block font-bold">isLoggedIn:</span>{' '}
          {loggedIn ? 'true' : 'false'}
        </div>
      </CardContent>
    </Card>
  );
};
