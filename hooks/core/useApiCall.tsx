import useSWR from 'swr';
import useSwrMutation from 'swr/mutation';
import { apiCall } from '../../utils/apiCall';

interface ApiCallData {
  url: string;
  type?: string;
  payload?: Record<string, unknown>;
  options?: Record<string, unknown>;
  autoInit?: boolean;
}

interface FetcherArgs {
  url: string;
  type?: string;
  payload: Record<string, unknown> | undefined;
}

export async function fetcher({ url, type, payload }: FetcherArgs) {
  if (type === 'post') {
    return await apiCall.post(url, payload || {});
  }
  if (type === 'put') {
    return await apiCall.put(url, payload || {});
  }
  if (type === 'delete') {
    return await apiCall.delete(url);
  }
  return await apiCall.get(url);
}

export function useApiCall<T>({
  url,
  type,
  payload,
  options,
  autoInit = true,
}: ApiCallData) {
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    autoInit ? { url, payload, type } : null,
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
  } = useSwrMutation({ url, payload, type }, fetcher, {
    populateCache: true,
    revalidate: true,
  });

  return {
    data: (data || mutationData) as T,
    isLoading: isLoading,
    isValidating: isValidating || isMutating,
    error: error || mutationError,
    fetch: autoInit ? mutate : trigger,
  };
}
