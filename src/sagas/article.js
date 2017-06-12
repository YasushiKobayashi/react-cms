import { call, fork, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { Archive, CommentApi } from '../api';
import * as actionTypes from '../actionTypes';
import selectors from './selectors';

function* getErr(type, message) {
  yield put({
    type: actionTypes.typeError(type),
    errorMessage: message,
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

export function* createComment(payload) {
  const post = payload.payload;
  try {
    const commnet = yield call(CommentApi.post, post);
    const article = yield select(selectors.getArticle);
    article.comments[article.comments.length] = commnet;
    yield put({
      type: actionTypes.typeLoaded(actionTypes.SET_ARTICLE),
      article: article,
    });
  } catch (e) {
    console.log(e);
    yield fork(getErr, actionTypes.SET_ARTICLE, 'コメントの作成に失敗しました。<br/>再度お試しください。');
  }
}


export function* editComment(payload) {
  console.log(payload.payload);
  const id = payload.payload.id;
  const post = {
    content: payload.payload.content,
  };
  try {
    const commnet = yield call(CommentApi.put, id, post);
    const article = yield select(selectors.getArticle);

    const commentsId = _.findIndex(article.comments, { id: parseInt(id, 10) });
    article.comments[commentsId].content = commnet.content;
    article.comments[commentsId].updated = commnet.updated;
    article.comments[commentsId].edit = false;

    yield put({
      type: actionTypes.typeLoaded(actionTypes.SET_ARTICLE),
      article: article,
    });
  } catch (e) {
    console.log(e);
    yield fork(getErr, actionTypes.SET_ARTICLE, 'コメントの作成に失敗しました。<br/>再度お試しください。');
  }
}
