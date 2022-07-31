import { proxy } from 'valtio';
import { LoginMethodsEnum } from '../types/enums';
import cloneDeep from 'lodash.clonedeep';

// Account info state + persistance

interface AccountState extends Record<string, unknown> {
  addressIndex: number; // For HW provider only
  address: string;
  nonce: number;
  balance: string;
}

const accountInitialState: AccountState = {
  addressIndex: 0,
  address: '',
  nonce: 0,
  balance: '',
};

export const accountState = proxy(accountInitialState);

export const setAccountState = (key: keyof AccountState, value: unknown) => {
  accountState[key] = value;
};

export const clearAccountState = () => {
  const resetObj = cloneDeep(accountInitialState);
  Object.keys(resetObj).forEach((key) => {
    setAccountState(key, resetObj[key]);
  });
};

// Login info state + persistance

export interface LoginInfoState extends Record<string, unknown> {
  loginMethod: LoginMethodsEnum;
  expires: number;
  loginToken: string;
  signature: string;
}

const loginInfoInitialState: LoginInfoState = {
  loginMethod: LoginMethodsEnum.none,
  expires: 0,
  loginToken: '',
  signature: '',
};

export const loginInfoState = proxy(loginInfoInitialState);

export const setLoginInfoState = (
  key: keyof LoginInfoState,
  value: unknown
) => {
  loginInfoState[key] = value;
};

export const clearLoginInfoState = () => {
  const resetObj = cloneDeep(loginInfoInitialState);
  Object.keys(resetObj).forEach((key) => {
    loginInfoState[key] = resetObj[key];
  });
};

// Login info state

export interface LoggingInState extends Record<string, unknown> {
  pending: boolean;
  error: string;
  loggedIn: boolean;
}

const loggingInInitialState: LoggingInState = {
  pending: true,
  error: '',
  loggedIn: false,
};

export const loggingInState = proxy(loggingInInitialState);

export const setLoggingInState = (
  key: keyof LoggingInState,
  value: unknown
) => {
  loggingInState[key] = value;
};

export const clearLoggingInState = () => {
  const resetObj = cloneDeep(loginInfoInitialState);
  Object.keys(resetObj).forEach((key) => {
    setLoggingInState(key, resetObj[key]);
  });
};

export const clearAuthStates = () => {
  clearAccountState();
  clearLoginInfoState();
  clearLoggingInState();
};
