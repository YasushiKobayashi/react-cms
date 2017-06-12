import * as actionTypes from '../actionTypes';
import { createAction } from '../utils';

export const getArticle = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.GET_ARTICLE), payload);
};

export const createArticle = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.CREATE_ARTICLE), payload);
};

export const editArticle = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.EDIT_ARTICLE), payload);
};

export const createComment = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.CREATE_COMMENT), payload);
};

export const editComment = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.EDIT_COMMENT), payload);
};
