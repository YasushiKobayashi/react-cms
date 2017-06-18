import { call, put, fork, cancel, select } from 'redux-saga/effects';

import { User, Archive } from '../api';
import * as actionTypes from '../actions/actionTypes';
import selectors from './selectors';
import { request, apiUrl, cookie } from '../utils';

function* notLogin() {
  yield put({
    type: actionTypes.LOGOUT,
  });
}


export function* isLogin() {
  const token = cookie.read('token');
  if (typeof token === 'undefined') {
    yield fork(notLogin);
    yield cancel();
  }
  const { isSsr } = yield select(selectors.getFromApp);
  if (isSsr) {
    yield put({
      type: actionTypes.typeSsr(actionTypes.GET_USER),
    });
    yield cancel();
  }
  try {
    const user = yield call(User.get, 'user');
    yield put({
      type: actionTypes.LOGINED,
      user: user,
    });
  } catch (e) {
    yield fork(notLogin);
  }
}

const handleLogin = (async (payload, urlType) => {
  const param = payload.payload;
  try {
    const tokenObj = await request.POST(apiUrl('v1', urlType), param);
    cookie.write('token', tokenObj.token);
    return true;
  } catch (e) {
    throw new Error(e);
  }
});

export function* login(payload) {
  try {
    yield call(handleLogin, payload, 'login');
    yield fork(isLogin);
  } catch (e) {
    console.log(e);
    yield fork(notLogin);
  }
}

export function* regist(payload) {
  try {
    yield call(handleLogin, payload, 'register');
    yield fork(isLogin);
  } catch (e) {
    console.log(e);
    yield fork(notLogin);
  }
}


export function* update(payload) {
  const param = payload.payload;
  try {
    const user = yield call(User.put(param));
    yield put({
      type: actionTypes.LOGINED,
      user: user,
    });
  } catch (e) {
    console.log(e);
    yield fork(notLogin);
  }
}

export function* getUserArticle() {
  try {
    const archives = yield call(Archive.getAllArticle('post/user'));
    yield put({
      type: actionTypes.typeLoaded(actionTypes.USER_ARTICLE),
      archives: archives,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: actionTypes.typeError(actionTypes.USER_ARTICLE),
    });
  }
}
