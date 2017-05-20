import React, { Component } from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';
import _ from 'lodash';

import style from '../../style';
import { request, validation, apiUrl, cookie } from '../../utils';
import { User } from '../../actions';
import './Login.scss';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      register: {
        name: '',
        email: '',
        password: '',
      },
      registerError: {
        name: '',
        email: '',
        password: '',
      },
    };

    this.handleRegister = this.handleRegister.bind(this);
    this.sendSinup = this.sendSinup.bind(this);
  }

  handleRegister(event, type) {
    const { register, registerError } = this.state;
    const val = event.target.value;
    register[type] = val;
    if (type === 'password') {
      registerError.password = validation.validPassword(val);
    } else if (type === 'email') {
      registerError.email = validation.validEmail(val);
    } else {
      registerError.name = validation.validEmpty(val, '名前');
    }
    this.setState({
      register: register,
      registerError: registerError,
    });
  }

  sendSinup() {
    const { register, registerError } = this.state;
    registerError.password = validation.validPassword(register.password);
    registerError.email = validation.validEmail(register.email);
    registerError.name = validation.validEmpty(register.name, '名前');
    let valid = true;
    _.each(registerError, (value) => {
      if (value !== '') return valid = false;
    });
    if (!valid) {
      return this.setState({
        registerError: registerError,
      });
    }

    return new Promise((resolve, reject) => {
      request.POST(apiUrl('v1', 'register'), register).then((obj) => {
        return obj.token;
      }).then((token) => {
        cookie.write(token);
        return new Promise((resolve, reject) => {
          User.get('user').then((obj) => {
            console.log(obj);
          }).catch((err) => {
            reject(err);
          });
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  sendSinin() {

  }

  render() {
    const {
      register,
      registerError,
    } = this.state;

    return (
      <div styleName='conteiner'>
        <Paper style={style.paper} zDepth={1} >
          <TextField
            floatingLabelText='name'
            onChange={(event) => { this.handleRegister(event, 'name'); }}
            value={register.name}
            errorText={registerError.name}
            style={style.titleField}
          />
          <TextField
            floatingLabelText='email'
            onChange={(event) => { this.handleRegister(event, 'email'); }}
            value={register.email}
            errorText={registerError.email}
            style={style.titleField}
            type="email"
          />
          <TextField
            floatingLabelText='password'
            onChange={(event) => { this.handleRegister(event, 'password'); }}
            value={register.password}
            errorText={registerError.password}
            style={style.titleField}
            type="password"
          />
          <RaisedButton
            label='SIGN UP'
            onClick={this.sendSinup}
            primary
          />
        </Paper>
      </div>
    );
  }
}
