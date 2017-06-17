/* @flow */
import React, { Component } from 'react';

import type { UserType } from '../../types/UserType';

import { Login } from '../../components';
import './LoginComponent.scss';

export default class LoginComponent extends Component {
  props: {
    user: UserType,
    login: Function,
  };

  render() {
    const { user, login } = this.props;

    return (
      <div styleName='conteiner'>
        <div styleName='content'>
          <Login
            type='SIGN UP'
            sendUserInfo={login}
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
