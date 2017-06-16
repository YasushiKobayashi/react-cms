import React, { Component } from 'react';

import type { User } from '../../types/User';

import { Login } from '../../components';
import './LoginComponent.scss';

export default class LoginComponent extends Component {
  props: {
    user: User,
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
