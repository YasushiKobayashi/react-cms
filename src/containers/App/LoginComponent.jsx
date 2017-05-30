import React, { Component, PropTypes } from 'react';

import { Login } from '../../components';
import './LoginComponent.scss';

export default class LoginComponent extends Component {
  static propTypes = {
    sendUserInfo: PropTypes.func.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { user, sendUserInfo } = this.props;

    return (
      <div styleName='conteiner'>
        <div styleName='content'>
          <Login
            type='SIGN UP'
            sendUserInfo={sendUserInfo}
            user={user}
          />

        </div>
        <div styleName='content'>
          <Login
            type='SIGN IN'
            sendUserInfo={sendUserInfo}
            user={user}
          />
        </div>
      </div>
    );
  }
}
