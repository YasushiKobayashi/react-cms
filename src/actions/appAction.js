import * as actionTypes from '../actionTypes';
import { cookie, createAction } from '../utils';

export const login = (payload) => createAction(actionTypes.LOGIN, payload);

export function logout() {
  cookie.delite('token');
  return {
    type: actionTypes.LOGOUT,
  };
}
