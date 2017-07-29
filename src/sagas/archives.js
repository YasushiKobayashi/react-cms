import { call, fork, put, select, cancel } from 'redux-saga/effects';
import _ from 'lodash';

import { Archive, Category } from '../api';
import * as actionTypes from '../actions/actionTypes';
import { params } from '../utils';
import selectors from './selectors';

function* getErr(type, message) {
  yield put({
    type: actionTypes.typeError(type),
    errorMessage: message,
  });
}

export function* loadInit() {
  const { isSsr } = yield select(selectors.getStateFromTop);
  if (isSsr) {
    yield put({
      type: actionTypes.typeSsr(actionTypes.INIT_ARTICLE),
    });
    yield cancel();
  }
  try {
    const categories = yield call(Category.get);
    const count = yield call(Archive.count);
    yield put({
      type: actionTypes.typeLoaded(actionTypes.INIT_ARTICLE),
      categories,
      count,
    });
  } catch (e) {
    yield fork(getErr, actionTypes.ALL_ARCHIVES, '記事の取得に失敗しました。<br/>再度お試しください。');
  }
}

export function* getArchives(payload) {
  try {
    const param = payload.payload;
    const url = `post?${param}`;
    const query = params.decode(param);

    console.log(param);
    console.log(query);
    const pageNumber = query ? query.pages : 1;

    const archives = yield call(Archive.getAllArticle, url);
    yield put({
      type: actionTypes.typeLoaded(actionTypes.FILTER_ARTICLE),
      archives,
      pageNumber,
    });
  } catch (e) {
    yield fork(getErr, actionTypes.FILTER_ARTICLE, '記事の検索に失敗しました。<br/>再度お試しください。');
  }
}

export function* loadAllFromCategory(payload) {
  try {
    const selectedCat = payload.payload;
    const archives = yield call(Archive.getAllArticle, `post/category/${selectedCat}`);
    yield put({
      type: actionTypes.typeLoaded(actionTypes.FILTER_ARTICLE),
      archives: archives,
    });
  } catch (e) {
    yield fork(getErr, actionTypes.ALL_ARCHIVES, '記事の取得に失敗しました。<br/>再度お試しください。');
  }
}

export function* sortArticles(payload) {
  const sort = payload.payload;
  let archives = yield select(selectors.getArchivesFromTop);
  if (sort === 'updated') {
    archives = _.sortBy(archives, (archive) => -archive.updated);
  } else {
    archives = _.sortBy(archives, (archive) => -archive.created);
  }
  yield put({
    type: actionTypes.typeLoaded(actionTypes.FILTER_ARTICLE),
    archives: archives,
  });
}
