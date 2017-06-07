import * as actionTypes from '../actionTypes';
import { User } from '../api';
import { cookie } from '../utils';


export function isLogin() {
  return async (dispatch) => {
    try {
      const token = cookie.read('token');
      if (typeof token === 'undefined') {
        throw new Error('not login');
      }
      const user = await User.get('user');
      dispatch({
        type: actionTypes.LOADED,
        isLoading: false,
        isLogin: true,
        user,
      });
    } catch (e) {
      dispatch({
        type: actionTypes.NOT_LOGIN,
        isLoading: false,
      });
    }
  };
}

export function login() {
  console.log('hoge');
}


export function logout() {
  cookie.delite('token');
  return {
    type: actionTypes.NOT_LOGIN,
  };
}

export function updateUser(user) {
  console.log('hoge');
  console.log(user);
}
