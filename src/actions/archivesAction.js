import * as actionTypes from './actionTypes';
import { createAction } from '../utils';

export const loadInit = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.INIT_ARTICLE), payload);
};

export const getArchives = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.ARCHIVES), payload);
};

export const getCount = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.COUNT), payload);
};

export const sortArticles = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.SORT), payload);
};

export const loadAllFromCategory = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.GET_FROM_CATEGORY), payload);
};
