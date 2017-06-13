import * as actionTypes from './actionTypes';
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

export const getCategories = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.GET_CATEGORIES), payload);
};

export const editCatName = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.EDIT_CAT_NAME), payload);
};

export const editCatSlug = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.EDIT_CAT_SLUG), payload);
};

export const createCategory = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.CREATE_CATEGORY), payload);
};

export const addCategories = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.ADD_CATEGORIES), payload);
};

export const removeCategories = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.REMOVE_CATEGORIES), payload);
};
