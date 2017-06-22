/* @flow */
import React, { Component } from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';
import _ from 'lodash';

import type { UserType } from '../../types/UserType';
import type { UserValidType } from '../../types/ValidType';
import { validation } from '../../utils';

import style from '../../style';
import './index.scss';

export default class Login extends Component {
  props: {
    user: String;
    type: UserType;
    sendUserInfo: Function;
  };
  state: {
    user: UserType;
    userError: UserValidType;
  };
  setState: Function;
  handleRegister: Function;
  handlePost: Function;
  handelValid: Function;

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
    this.setState({
      user: this.props.user,
    });
  }

  handleRegister(event: any, type: string) {
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
    console.log(urlType);
    if (this.handelValid(type)) {
      // user.urlType = urlType;
      sendUserInfo(user);
    }
  }

  handelValid(type: string) {
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

    const idType = type !== 'SIGN IN' ? 'signin' : 'signup';
    const name = type !== 'SIGN IN' ? (<TextField
      id={`name_${idType}`}
      floatingLabelText='name'
      onChange={(event) => { this.handleRegister(event, 'name'); }}
      value={user.name}
      errorText={userError.name}
      style={style.titleField}
    />) : false;

    return (
      <div id={`conteiner_${idType}`} styleName='conteiner'>
        <Paper style={style.paper} zDepth={1} >
          {name}
          <TextField
            id={`email_${idType}`}
            floatingLabelText='email'
            onChange={(event) => { this.handleRegister(event, 'email'); }}
            value={user.email}
            errorText={userError.email}
            style={style.titleField}
            type="email"
          />
          <TextField
            id={`password_${idType}`}
            floatingLabelText='password'
            onChange={(event) => { this.handleRegister(event, 'password'); }}
            value={user.password}
            errorText={userError.password}
            style={style.titleField}
            type="password"
          />
          <RaisedButton
            styleName='btn'
            id={`btn_${idType}`}
            label={type}
            onClick={this.handlePost}
            primary
          />
        </Paper>
      </div>
    );
  }
}
