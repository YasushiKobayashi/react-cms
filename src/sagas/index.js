import { takeEvery, fork, all } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes';
import * as app from './app';
import * as top from './top';


export default function* rootSaga() {
  yield all([
    fork(app.isLogin),
    takeEvery(actionTypes.LOGIN, app.login),

    takeEvery(actionTypes.typeReqest(actionTypes.ALL_ARTICLE), top.loadAll),
    takeEvery(actionTypes.typeReqest(actionTypes.SORT), top.sorrtArticles),
    takeEvery(actionTypes.typeReqest(actionTypes.SEARCH), top.serachArticles),
  ]);
}
