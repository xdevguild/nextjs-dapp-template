import { useEffect } from 'react';
import { useScQuery, SCQueryType, useConfig } from '@useelven/core';
import { shortenHash } from '@/lib/shortenHash';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const mintSmartContractAddress =
  process.env.NEXT_PUBLIC_MINT_SMART_CONTRACT_ADDRESS || '';
const queryFunctionName = process.env.NEXT_PUBLIC_QUERY_FUNCTION_NAME || '';

export const SimpleScQeryDemo = ({
  cb,
}: {
  cb: (queryResult: string, pending: boolean, error: string) => void;
}) => {
  const { explorerAddress, chainType } = useConfig();
  const {
    data: queryResult,
    fetch, // you can always trigger the query manually if 'autoInit' is set to false
    isLoading, // pending state for initial load
    isValidating, // pending state for each revalidation of the data, for example using the mutate
    error,
  } = useScQuery<number>({
    type: SCQueryType.NUMBER, // can be int or string
    payload: {
      scAddress: mintSmartContractAddress,
      funcName: queryFunctionName,
      args: [],
    },
    autoInit: false, // you can enable or disable trigger of the query on component mount
  });

  useEffect(() => {
    if (queryResult !== undefined && queryResult !== null) {
      cb?.(queryResult.toString(), isLoading || isValidating, error);
    }
  }, [cb, error, isLoading, isValidating, queryResult]);

  const handleFetch = () => {
    fetch();
  };

  return (
    <Card className="flex-1">
      <CardContent className="mt-6">
        <div className="mb-4">
          3. You will be querying the smart contract for NFT tokens left to
          mint: <br />
          <a
            className="font-bold"
            href={`${explorerAddress}/accounts/${mintSmartContractAddress}`}
            target="_blank"
          >
            {shortenHash(mintSmartContractAddress, 8)}
          </a>{' '}
          <br />({chainType})
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          disabled={isLoading || isValidating}
          onClick={handleFetch}
        >
          Query
        </Button>
      </CardFooter>
    </Card>
  );
};
