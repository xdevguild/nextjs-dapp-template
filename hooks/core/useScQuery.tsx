import useSWR, { Fetcher } from 'swr';
import useSwrMutation from 'swr/mutation';
import { apiCall } from '../../utils/apiCall';

export enum SCQueryType {
  INT = 'int',
  STRING = 'string',
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

export const useScQuery = ({
  type,
  payload,
  options,
  autoInit = true,
}: SCQueryData) => {
  let url = '';

  switch (type) {
    case SCQueryType.INT:
      url = '/vm-values/int';
      break;
    case SCQueryType.STRING:
      url = '/vm-values/string';
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

  return {
    data: data?.data?.data || mutationData?.data?.data,
    isLoading: isLoading,
    isValidating: isValidating || isMutating,
    error: error || mutationError,
    fetch: autoInit ? mutate : trigger,
  };
};
