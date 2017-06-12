import { takeEvery, fork, all } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes';
import * as user from './user';
import * as article from './article';
import * as archives from './archives';


export default function* rootSaga() {
  yield all([
    fork(user.isLogin),
    takeEvery(actionTypes.LOGIN, user.login),

    takeEvery(actionTypes.typeReqest(actionTypes.ALL_ARCHIVES), archives.loadAll),
    takeEvery(actionTypes.typeReqest(actionTypes.SORT), archives.sortArticles),
    takeEvery(actionTypes.typeReqest(actionTypes.SEARCH), archives.serachArticles),

    takeEvery(actionTypes.typeReqest(actionTypes.GET_ARTICLE), article.getArticle),

    takeEvery(actionTypes.typeReqest(actionTypes.CREATE_COMMENT), article.createComment),
    takeEvery(actionTypes.typeReqest(actionTypes.EDIT_COMMENT), article.editComment),
  ]);
}
