import { call, fork, put, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import { Archive } from '../api';
import * as actionTypes from '../actions/actionTypes';
import selectors from './selectors';

import { validation } from '../utils';

function* getErr(type, message) {
  yield put({
    type: actionTypes.typeError(type),
    errorMessage: message,
  });
}

function* validErr(valid) {
  yield put({
    type: actionTypes.typeValidError(actionTypes.SET_ARTICLE),
    valid: valid,
  });
}

export function* getArticle(payload) {
  const id = payload.payload;
  try {
    const article = yield call(Archive.getSigleArticle, id);
    yield put({
      type: actionTypes.typeLoaded(actionTypes.SET_ARTICLE),
      article: article,
    });
  } catch (e) {
    console.log(e);
    yield fork(getErr, actionTypes.SET_ARTICLE, '記事の取得に失敗しました。<br/>再度お試しください。');
  }
}
export function* editArticle(payload) {
  const article = payload.payload;
  const valid = yield select(selectors.getValidFromEdit);
  valid.titleError = validation.validTitle(article.title);

  yield fork(validErr, valid);
  yield put({
    type: actionTypes.typeLoaded(actionTypes.SET_ARTICLE),
    article: article,
  });
}

export function* createArticle(payload) {
  const flag = payload.payload;
  try {
    const post = yield select(selectors.getArticleFromEdit);
    post.wp_flg = flag;
    const article = yield call(Archive.postArticle, post);
    browserHistory.push(`/article/${article.id}`);
  } catch (e) {
    console.log(e);
    yield fork(getErr, actionTypes.SET_ARTICLE, '記事の取得に失敗しました。<br/>再度お試しください。');
  }
}

export function* putArticle(payload) {
  const { id, flag } = payload.payload;
  try {
    const post = yield select(selectors.getArticleFromEdit);
    post.wp_flg = flag;
    const article = yield call(Archive.putArticle, id, post);
    browserHistory.push(`/article/${article.id}`);
  } catch (e) {
    console.log(e);
    yield fork(getErr, actionTypes.SET_ARTICLE, '記事の取得に失敗しました。<br/>再度お試しください。');
  }
}
