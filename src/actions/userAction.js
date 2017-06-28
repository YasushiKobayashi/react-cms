import * as actionTypes from './actionTypes';
import { cookie, createAction } from '../utils';

export const login = (payload) => {
  return createAction(actionTypes.LOGIN, payload);
};

export const regist = (payload) => {
  return createAction(actionTypes.REGIST, payload);
};

export const setUserInfo = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.SET_USER), payload);
};

export const getUserInfo = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.GET_USER), payload);
};

export const updateUserInfo = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.UPDATE_USER), payload);
};

export function logout() {
  cookie.delite('token');
  return {
    type: actionTypes.LOGOUT,
  };
}
