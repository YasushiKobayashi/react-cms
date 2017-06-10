import React, { Component } from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';
import _ from 'lodash';

import { validation } from '../../utils';
import type { User } from '../../types/User';

import style from '../../style';
import './index.scss';

export default class Login extends Component {
  props: {
    user: String,
    type: User,
    sendUserInfo: Function,
  };

  state: {
    user: User,
  };

  constructor() {
    super();
    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
      },
      userError: {
        name: '',
        email: '',
        password: '',
      },
    };

    this.handleRegister = this.handleRegister.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handelValid = this.handelValid.bind(this);
  }

  componentWillMount() {
    const { user } = this.props;
    user.password = this.state.user.password;
    this.setState({
      user: user,
    });
  }

  handleRegister(event, type) {
    const { user, userError } = this.state;
    const val = event.target.value;
    user[type] = val;
    if (type === 'password') {
      userError.password = validation.validPassword(val);
    } else if (type === 'email') {
      userError.email = validation.validEmail(val);
    } else {
      userError.name = validation.validEmpty(val, '名前');
    }
    this.setState({
      user: user,
      userError: userError,
    });
  }

  handlePost() {
    const { user } = this.state;
    const { type, sendUserInfo } = this.props;
    const urlType = (type !== 'SIGN IN') ? 'register' : 'login';
    if (this.handelValid(type)) {
      user.urlType = urlType;
      sendUserInfo(user);
    }
  }

  handelValid(type) {
    const { user, userError } = this.state;
    if (type !== 'SIGN IN') {
      userError.name = validation.validEmpty(user.name, '名前');
    }
    userError.password = validation.validPassword(user.password);
    userError.email = validation.validEmail(user.email);
    let valid = true;
    _.each(userError, (value) => {
      if (value !== '') return valid = false;
    });
    if (!valid) {
      return this.setState({
        userError: userError,
      });
    }
    return valid;
  }

  render() {
    const { type } = this.props;
    const {
      user,
      userError,
    } = this.state;

    const name = type !== 'SIGN IN' ? (<TextField
      floatingLabelText='name'
      onChange={(event) => { this.handleRegister(event, 'name'); }}
      value={user.name}
      errorText={userError.name}
      style={style.titleField}
    />) : false;

    return (
      <div styleName='conteiner'>
        <Paper style={style.paper} zDepth={1} >
          {name}
          <TextField
            floatingLabelText='email'
            onChange={(event) => { this.handleRegister(event, 'email'); }}
            value={user.email}
            errorText={userError.email}
            style={style.titleField}
            type="email"
          />
          <TextField
            floatingLabelText='password'
            onChange={(event) => { this.handleRegister(event, 'password'); }}
            value={user.password}
            errorText={userError.password}
            style={style.titleField}
            type="password"
          />
          <RaisedButton
            styleName='btn'
            label={type}
            onClick={this.handlePost}
            primary
          />
        </Paper>
      </div>
    );
  }
}
