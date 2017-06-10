import { call, fork, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { Archive, Category } from '../api';
import * as actionTypes from '../actionTypes';
import selectors from './selectors';

function* getErr(type, message) {
  yield put({
    type: actionTypes.typeError(type),
    errorMessage: message,
  });
}

export function* loadAll() {
  try {
    const categories = yield call(Category.get);
    const archives = yield call(Archive.getAllArticle, 'post');
    yield put({
      type: actionTypes.typeLoaded(actionTypes.ALL_ARTICLE),
      categories: categories,
      archives: archives,
    });
  } catch (e) {
    yield fork(getErr, actionTypes.ALL_ARTICLE, '記事の取得に失敗しました。<br/>再度お試しください。');
  }
}


export function* sorrtArticles(payload) {
  const sort = payload.payload;
  let archives = yield select(selectors.getArchives);
  if (sort === 'updated') {
    archives = _.sortBy(archives, (archive) => -archive.updated);
  } else {
    archives = _.sortBy(archives, (archive) => -archive.created);
  }
  yield put({
    type: actionTypes.typeLoaded(actionTypes.ARTICLE),
    archives: archives,
  });
}

export function* serachArticles(payload) {
  try {
    const archives = yield call(Archive.serachArticles, payload);
    yield put({
      type: actionTypes.typeLoaded(actionTypes.ARTICLE),
      archives: archives,
    });
  } catch (e) {
    yield fork(getErr, actionTypes.ARTICLE, '記事の取得に失敗しました。<br/>再度お試しください。');
  }
}
