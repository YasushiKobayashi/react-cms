import * as actionTypes from '../actionTypes';
import { createAction } from '../utils';

export const loadContent = () => {
  return createAction(actionTypes.typeReqest(actionTypes.ALL_ARTICLE));
};

export const sortContent = (payload) => {
  return createAction(actionTypes.typeReqest(actionTypes.SORT), payload);
};
