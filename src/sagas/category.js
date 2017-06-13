import { call, fork, put, select, cancel } from 'redux-saga/effects';
import _ from 'lodash';

import { Category } from '../api';
import * as actionTypes from '../actions/actionTypes';
import selectors from './selectors';
import { validation } from '../utils';

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
  const categories = yield select(selectors.getCategoriesFromEdit);
  const categoryLists = yield select(selectors.getCategoryListsFromEdit);
  categories[categories.length] = categoryLists[id];
  yield put({
    type: actionTypes.typeLoaded(actionTypes.SET_CATEGORY_LIST),
    categories: categories,
    categoryLists: _.pull(categoryLists, categoryLists[id]),
  });
}

export function* removeCategories(payload) {
  const id = payload.payload;
  const categories = yield select(selectors.getCategoriesFromEdit);
  const categoryLists = yield select(selectors.getCategoryListsFromEdit);
  categoryLists[categoryLists.length] = categories[id];
  yield put({
    type: actionTypes.typeLoaded(actionTypes.SET_CATEGORY_LIST),
    categories: _.pull(categories, categories[id]),
    categoryLists: categoryLists,
  });
}

export function* editCatName(payload) {
  const categoryNew = yield select(selectors.getNewCetegoryFromEdit);
  console.log(categoryNew);
  categoryNew.name = payload.payload;
  yield fork(editCategory, categoryNew);

  const valid = yield select(selectors.getValidFromEdit);
  console.log(valid);
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

export function* createCategory() {
  try {
    const categoryNew = yield select(selectors.getNewCetegoryFromEdit);
    const valid = yield select(selectors.getValidFromEdit);
    valid.catNameError = validation.validEmpty(categoryNew.name, 'カテゴリ');
    valid.catSlugErrror = validation.validNonJpanese(categoryNew.slug, 'スラッグ');
    if (valid.catNameError || valid.catSlugErrror) {
      yield fork(validErr, valid);
      yield cancel();
    }

    const category = yield call(Category.post, categoryNew);
    const categories = yield select(selectors.getCategoriesFromEdit);
    console.log(categories);
    categories[categories.length] = category;
    yield put({
      type: actionTypes.typeLoaded(actionTypes.CREATE_CATEGORY),
      categories: categories,
    });
  } catch (e) {
    console.log(e);
    yield fork(getErr, 'カテゴリの作成に失敗しました。<br/>再度お試しください。');
  }
}
