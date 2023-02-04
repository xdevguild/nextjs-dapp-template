import { useProxy } from '../tools/useProxy';
import { accountState } from '../../store/auth';

export const useAccount = () => {
  const account = useProxy(accountState);

  return account;
};
