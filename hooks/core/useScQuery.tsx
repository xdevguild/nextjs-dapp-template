import useSWR, { Fetcher } from 'swr';
import useSwrMutation from 'swr/mutation';
import { apiCall } from '../../utils/apiCall';

export enum SCQueryType {
  NUMBER = 'number',
  STRING = 'string',
  BOOLEAN = 'boolean',
}

interface SCQueryData {
  type: SCQueryType;
  payload?: Record<string, unknown>;
  options?: Record<string, unknown>;
  autoInit?: boolean;
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

export function useScQuery<T extends number | string | boolean>({
  type,
  payload,
  options,
  autoInit = true,
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

  const parseData = (data: string | number | undefined) => {
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
