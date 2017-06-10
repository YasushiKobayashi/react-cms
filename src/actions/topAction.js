import * as actionTypes from '../actionTypes';
import { createAction } from '../utils';

export const loadContent = () => {
  return createAction(actionTypes.typeReqest(actionTypes.ALL_ARTICLE));
};

export const sorrtArticles = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.SORT), payload);
};

export const serachArticles = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.SEARCH), payload);
};
