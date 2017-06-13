import * as actionTypes from './actionTypes';
import { cookie, createAction } from '../utils';

export const login = (payload) => {
  return createAction(actionTypes.LOGIN, payload);
};

export const getUserArticle = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.USER_ARTICLE), payload);
};

export const getUserInfo = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.GET_USER), payload);
};

export function logout() {
  cookie.delite('token');
  return {
    type: actionTypes.LOGOUT,
  };
}
