import * as actionTypes from './actionTypes';
import { createAction } from '../utils';

export const loadAllContent = () => {
  return createAction(actionTypes.typeReqest(actionTypes.ALL_ARCHIVES));
};

export const sortArticles = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.SORT), payload);
};

export const serachArticles = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.SEARCH), payload);
};
