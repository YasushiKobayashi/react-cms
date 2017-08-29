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

function* errorMessage(message) {
  console.log(message);
  yield put({
    type: actionTypes.LOGIN_ERROR,
    message,
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
      isLogin: true,
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
    if (tokenObj.token === '') {
      throw new Error('トークンの取得エラー');
    }
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
    console.log('ログインに失敗しました。');
    console.log(e);
    yield fork(errorMessage, 'ログインに失敗しました。');
  }
}

export function* regist(payload) {
  try {
    yield call(handleLogin, payload, 'register');
    yield fork(isLogin);
  } catch (e) {
    console.log(e);
    yield fork(errorMessage, '新規登録に失敗しました。');
  }
}

export function* setUserInfo() {
  const user = yield select(selectors.getUser);
  yield put({
    type: actionTypes.typeLoaded(actionTypes.SET_USER),
    user: user,
  });
  try {
    const archives = yield call(Archive.getAllArticle, 'post/user');
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

export function* updateUserInfo(payload) {
  const user = payload.payload;
  try {
    User.put(user);
    yield put({
      type: actionTypes.typeLoaded(actionTypes.UPDATE_USER),
      msessage: 'ユーザー情報の更新を行いました。',
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: actionTypes.typeError(actionTypes.UPDATE_USER),
    });
  }
}
