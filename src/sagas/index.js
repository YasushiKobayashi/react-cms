import { takeEvery, fork, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as user from './user';
import * as article from './article';
import * as archives from './archives';
import * as category from './category';
import * as edit from './edit';


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

    takeEvery(actionTypes.typeReqest(actionTypes.EDIT_ARTICLE), edit.editArticle),

    takeEvery(actionTypes.typeReqest(actionTypes.GET_CATEGORIES), category.getCategories),
    takeEvery(actionTypes.typeReqest(actionTypes.EDIT_CAT_NAME), category.editCatName),
    takeEvery(actionTypes.typeReqest(actionTypes.EDIT_CAT_SLUG), category.editCatSlug),
    takeEvery(actionTypes.typeReqest(actionTypes.CREATE_CATEGORY), category.createCategory),

    takeEvery(actionTypes.typeReqest(actionTypes.ADD_CATEGORIES), category.addCategories),
    takeEvery(actionTypes.typeReqest(actionTypes.REMOVE_CATEGORIES), category.removeCategories),
  ]);
}
