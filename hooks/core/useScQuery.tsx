import useSWR, { Fetcher } from 'swr';
import {
  ResultsParser,
  SmartContractAbi,
  SmartContract,
  Address,
  AbiRegistry,
} from '@multiversx/sdk-core';
import { ContractQueryResponse } from '@multiversx/sdk-network-providers';
import useSwrMutation from 'swr/mutation';
import { apiCall } from '../../utils/apiCall';

export enum SCQueryType {
  NUMBER = 'number',
  STRING = 'string',
  BOOLEAN = 'boolean',
  COMPLEX = 'complex',
}

interface SCQueryData {
  type: SCQueryType;
  payload?: Record<string, unknown>;
  options?: Record<string, unknown>;
  autoInit?: boolean;
  abiJSON?: {
    name: string;
    endpoints: unknown[];
    types: unknown;
  };
}

interface FetcherArgs {
  url: string;
  payload: Record<string, unknown> | undefined;
}

export interface VMOutput {
  data: { data: string | number };
  error: string;
  code: string;
}

export const fetcher: Fetcher<VMOutput, FetcherArgs> = async ({
  url,
  payload,
}) => await apiCall.post(url, payload || {});

export function useScQuery<T extends number | string | boolean | unknown>({
  type,
  payload,
  options,
  autoInit = true,
  abiJSON,
}: SCQueryData) {
  let url = '';

  switch (type) {
    case SCQueryType.NUMBER:
      url = '/vm-values/int';
      break;
    case SCQueryType.STRING:
      url = '/vm-values/string';
      break;
    case SCQueryType.BOOLEAN:
      url = '/vm-values/int';
      break;
    // You need to provide ABI JSON for proper results parsing
    case SCQueryType.COMPLEX:
      url = '/vm-values/query';
      break;
  }

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    autoInit ? { url, payload } : null,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      ...options,
    }
  );

  const {
    data: mutationData,
    error: mutationError,
    trigger,
    isMutating,
  } = useSwrMutation({ url, payload }, fetcher, {
    populateCache: true,
    revalidate: true,
  });

  const parseData = (data: string | number | undefined | unknown) => {
    if (data === undefined || data === null) return;

    if (type === SCQueryType.COMPLEX && !abiJSON) {
      throw new Error(
        'Please provide the ABI JSON contents if you want to use the COMPLEX queries in useScQuery! Check README.md for more info.'
      );
    }

    if (
      type === SCQueryType.COMPLEX &&
      abiJSON &&
      (data as Record<string, unknown>)?.returnData &&
      payload?.scAddress &&
      payload?.funcName
    ) {
      const parser = new ResultsParser();
      const abiRegistry = AbiRegistry.create(abiJSON);
      const abi = new SmartContractAbi(abiRegistry, [abiJSON.name]);
      const contract = new SmartContract({
        address: new Address(payload.scAddress as string),
        abi: abi,
      });
      const endpointDefinition = contract.getEndpoint(
        payload.funcName as string
      );
      const smResponse = ContractQueryResponse.fromHttpResponse(data);
      const parsedResponse = parser.parseQueryResponse(
        smResponse,
        endpointDefinition
      );
      return parsedResponse;
    }

    if (type === SCQueryType.BOOLEAN) {
      return Boolean(Number(data));
    }

    if (type === SCQueryType.NUMBER) {
      return Number(data);
    }

    return data;
  };

  return {
    data: parseData(data?.data?.data || mutationData?.data?.data) as T,
    isLoading: isLoading,
    isValidating: isValidating || isMutating,
    error: error || mutationError,
    fetch: autoInit ? mutate : trigger,
  };
}
