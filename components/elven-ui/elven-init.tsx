'use client';

import { useNetworkSync } from '@useelven/core';

/**
 * Initialize the useElven library. Should be run on the client side.
 * You can configure all parameters for useNetworkSync. The best if they will come from .env.local file
 * */
export const ElvenInit = () => {
  useNetworkSync({
    apiTimeout: '10000',
    chainType: process.env.NEXT_PUBLIC_MULTIVERSX_CHAIN,
    ...(process.env.NEXT_PUBLIC_MULTIVERSX_API
      ? { apiAddress: process.env.NEXT_PUBLIC_MULTIVERSX_API }
      : {}),
    ...(process.env.NEXT_PUBLIC_WC_PROJECT_ID
      ? { walletConnectV2ProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID }
      : {}),
  });
  return null;
};
