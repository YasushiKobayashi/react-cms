import { appType } from '../actionTypes';

export function isLoading() {
  return {
    type: appType.LOADING,
  };
}

export function isLogin() {
  return {
    type: appType.NOT_LOGIN,
  };
}
