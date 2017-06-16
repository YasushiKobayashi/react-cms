import { call, fork, put, select, cancel } from 'redux-saga/effects';
import _ from 'lodash';

import { Category } from '../api';
import * as actionTypes from '../actions/actionTypes';
import selectors from './selectors';
import { validation } from '../utils';

/**
 * [エラー時の処理]
 * @param  {[type]}    message [description]
 * @return {Generator}         [description]
 */
function* getErr(message) {
  yield put({
    type: actionTypes.typeError(actionTypes.SET_ARTICLE),
    errorMessage: message,
  });
}

function* validErr(valid) {
  yield put({
    type: actionTypes.typeValidError(actionTypes.SET_ARTICLE),
    valid: valid,
  });
}

function* editCategory(categoryNew) {
  yield put({
    type: actionTypes.typeLoaded(actionTypes.EDIT_CATEGORY),
    categoryNew: categoryNew,
  });
}

function* validCategory() {
  const categoryNew = yield select(selectors.getNewCetegoryFromEdit);
  const valid = yield select(selectors.getValidFromEdit);
  valid.catNameError = validation.validEmpty(categoryNew.name, 'カテゴリ');
  valid.catSlugErrror = validation.validNonJpanese(categoryNew.slug, 'スラッグ');
  yield fork(validErr, valid);
}

export function* getCategories() {
  try {
    const categoryLists = yield call(Category.get);
    yield put({
      type: actionTypes.typeLoaded(actionTypes.SET_CATEGORY_LIST),
      categoryLists: categoryLists,
    });
  } catch (e) {
    console.log(e);
    yield fork(getErr, 'カテゴリの取得に失敗しました。<br/>再度お試しください。');
  }
}

export function* addCategories(payload) {
  const id = payload.payload;
  const categoryLists = yield select(selectors.getCategoryListsFromEdit);
  const article = yield select(selectors.getArticleFromEdit);
  article.categories[article.categories.length] = categoryLists[id];
  yield put({
    type: actionTypes.typeLoaded(actionTypes.SET_CATEGORY),
    article: article,
    categoryLists: _.pull(categoryLists, categoryLists[id]),
  });
}

export function* removeCategories(payload) {
  const id = payload.payload;
  const article = yield select(selectors.getArticleFromEdit);
  const categoryLists = yield select(selectors.getCategoryListsFromEdit);
  categoryLists[categoryLists.length] = article.categories[id];
  yield put({
    type: actionTypes.typeLoaded(actionTypes.SET_CATEGORY_LIST),
    article: article,
    categories: _.pull(article.categories, article.categories[id]),
    categoryLists: categoryLists,
  });
}

export function* editCatName(payload) {
  const categoryNew = yield select(selectors.getNewCetegoryFromEdit);
  categoryNew.name = payload.payload;
  yield fork(editCategory, categoryNew);

  const valid = yield select(selectors.getValidFromEdit);
  valid.catNameError = validation.validEmpty(categoryNew.name, 'カテゴリ');
  yield fork(validErr, valid);
}

export function* editCatSlug(payload) {
  const categoryNew = yield select(selectors.getNewCetegoryFromEdit);
  categoryNew.slug = payload.payload;
  yield fork(editCategory, categoryNew);

  const valid = yield select(selectors.getValidFromEdit);
  valid.catSlugErrror = validation.validNonJpanese(categoryNew.slug, 'スラッグ');
  yield fork(validErr, valid);
}

/**
 * [カテゴリの新規作成を行なう]
 * @return {Generator} [description]
 */
export function* createCategory() {
  try {
    yield fork(validCategory);
    const valid = yield select(selectors.getValidFromEdit);
    if (valid.catNameError || valid.catSlugErrror) {
      yield cancel();
    }

    const categoryNew = yield select(selectors.getNewCetegoryFromEdit);
    const category = yield call(Category.post, categoryNew);
    const article = yield select(selectors.getArticleFromEdit);

    article.categories[article.categories.length] = category;
    yield put({
      type: actionTypes.typeLoaded(actionTypes.CREATE_CATEGORY),
      article: article,
    });
  } catch (e) {
    console.log(e);
    yield fork(getErr, 'カテゴリの作成に失敗しました。<br/>再度お試しください。');
  }
}
