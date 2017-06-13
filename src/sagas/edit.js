import { call, fork, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { Archive } from '../api';
import * as actionTypes from '../actions/actionTypes';
import selectors from './selectors';

function* getErr(type, message) {
  yield put({
    type: actionTypes.typeError(type),
    errorMessage: message,
  });
}

export function* editArticle(payload) {
  const article = payload.payload;
  yield put({
    type: actionTypes.typeLoaded(actionTypes.SET_ARTICLE),
    article: article,
  });
}


export function* createArticle(payload) {

}
