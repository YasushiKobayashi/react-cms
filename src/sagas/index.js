import { takeEvery, fork, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as user from './user';
import * as article from './article';
import * as archives from './archives';
import * as category from './category';
import * as comment from './comment';


export default function* rootSaga() {
  yield all([
    fork(user.isLogin),
    takeEvery(actionTypes.LOGIN, user.login),
    takeEvery(actionTypes.REGIST, user.regist),

    // user関連
    takeEvery(actionTypes.typeReqest(actionTypes.SET_USER), user.setUserInfo),
    takeEvery(actionTypes.typeReqest(actionTypes.GET_USER), user.isLogin),
    takeEvery(actionTypes.typeReqest(actionTypes.UPDATE_USER), user.updateUserInfo),

    // archive関連
    takeEvery(actionTypes.typeReqest(actionTypes.INIT_ARTICLE), archives.loadInit),
    takeEvery(actionTypes.typeReqest(actionTypes.COUNT), archives.getCount),
    takeEvery(actionTypes.typeReqest(actionTypes.SORT), archives.sortArticles),
    takeEvery(actionTypes.typeReqest(actionTypes.ARCHIVES), archives.getArchives),
    takeEvery(actionTypes.typeReqest(actionTypes.GET_FROM_CATEGORY), archives.loadAllFromCategory),

    takeEvery(actionTypes.typeReqest(actionTypes.GET_ARTICLE), article.getArticle),
    takeEvery(actionTypes.typeReqest(actionTypes.EDIT_ARTICLE), article.editArticle),
    takeEvery(actionTypes.typeReqest(actionTypes.CREATE_ARTICLE), article.createArticle),
    takeEvery(actionTypes.typeReqest(actionTypes.PUT_ARTICLE), article.putArticle),

    takeEvery(actionTypes.typeReqest(actionTypes.CREATE_COMMENT), comment.createComment),
    takeEvery(actionTypes.typeReqest(actionTypes.EDIT_COMMENT), comment.editComment),

    takeEvery(actionTypes.typeReqest(actionTypes.GET_CATEGORIES), category.getCategories),
    takeEvery(actionTypes.typeReqest(actionTypes.EDIT_CAT_NAME), category.editCatName),
    takeEvery(actionTypes.typeReqest(actionTypes.EDIT_CAT_SLUG), category.editCatSlug),
    takeEvery(actionTypes.typeReqest(actionTypes.CREATE_CATEGORY), category.createCategory),

    takeEvery(actionTypes.typeReqest(actionTypes.ADD_CATEGORIES), category.addCategories),
    takeEvery(actionTypes.typeReqest(actionTypes.REMOVE_CATEGORIES), category.removeCategories),
  ]);
}
