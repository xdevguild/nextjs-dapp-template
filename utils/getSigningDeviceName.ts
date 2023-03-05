import { LoginMethodsEnum } from '@useelven/core';

// We need two 'remote' ones, Ledger and xPortal for now
export const getLoginMethodDeviceName = (type: LoginMethodsEnum) => {
  if (type === LoginMethodsEnum.ledger) return 'Ledger hardware wallet';
  if (type === LoginMethodsEnum.walletconnect) return 'xPortal app';
  return '';
};
