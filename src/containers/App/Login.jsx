import React, { Component, PropTypes } from 'react';

import LoginComponent from './LoginComponent';
import './Login.scss';

export default class Login extends Component {
  static propTypes = {
    manageLogin: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div styleName='conteiner'>
        <div styleName='content'>
          <LoginComponent
            type='SIGN UP'
            manageLogin={this.props.manageLogin}
          />

        </div>
        <div styleName='content'>
          <LoginComponent
            type='SIGN IN'
            manageLogin={this.props.manageLogin}
          />
        </div>
      </div>
    );
  }
}
