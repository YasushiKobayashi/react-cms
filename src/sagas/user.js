import { call, put, fork } from 'redux-saga/effects';

import { request, apiUrl, cookie } from '../utils';
import { User } from '../api';
import * as actionTypes from '../actionTypes';

function* notLogin() {
  yield put({
    type: actionTypes.LOGOUT,
  });
}


export function* isLogin() {
  const token = cookie.read('token');
  if (typeof token === 'undefined') {
    yield fork(notLogin);
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

const handleLogin = (async (payload) => {
  const param = payload.payload;
  const urlType = param.urlType;
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
    yield call(handleLogin, payload);
    const user = yield call(User.get('user'));
    yield put({
      type: actionTypes.LOGINED,
      user: user,
    });
  } catch (e) {
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
    yield fork(notLogin);
  }
}
