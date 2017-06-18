/* @flow */
import React, { Component } from 'react';

import type { UserType } from '../../types/UserType';

import { Login } from '../../components';
import './LoginComponent.scss';

export default class LoginComponent extends Component {
  props: {
    user: UserType,
    regist: Function;
    login: Function,
  };

  render() {
    const { user, login, regist } = this.props;

    return (
      <div styleName='conteiner'>
        <div styleName='content'>
          <Login
            type='SIGN UP'
            sendUserInfo={regist}
            user={user}
          />
        </div>
        <div styleName='content'>
          <Login
            type='SIGN IN'
            sendUserInfo={login}
            user={user}
          />
        </div>
      </div>
    );
  }
}
