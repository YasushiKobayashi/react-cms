import { call, put } from 'redux-saga/effects';

import { Archive, Category } from '../api';
import * as actionTypes from '../actionTypes';

export function* loadAll() {
  try {
    const categories = yield call(Category.get);
    const archives = yield call(Archive.getList, 'post');
    yield put({
      type: actionTypes.typeLoaded(actionTypes.ALL_ARTICLE),
      categories: categories,
      archives: archives,
    });
  } catch (e) {
    yield put({
      type: actionTypes.typeError(actionTypes.ALL_ARTICLE),
    });
  }
}

export function* sortContent() {

}

export function* searchContent() {
  try {
    const categories = yield call(Category.get);
    const archives = yield call(Archive.getList, 'post');
    yield put({
      type: actionTypes.LOAD_ALL,
      categories: categories,
      archives: archives,
    });
  } catch (e) {
    yield put({
      type: actionTypes.LOAD_ALL_ERROR,
      isLoading: false,
    });
  }
}
