import React, { Component, PropTypes } from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';
import _ from 'lodash';

import style from '../../style';
import { request, validation, apiUrl, cookie } from '../../utils';
import { User } from '../../actions';
import './index.scss';

export default class Login extends Component {
  static propTypes = {
    sendUserInfo: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  }


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
    this.handlePut = this.handlePut.bind(this);
    this.handelValid = this.handelValid.bind(this);
  }

  componentWillMount() {
    const { user } = this.props;
    this.setState({
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
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
    const { type, sendUserInfo } = this.props;
    const { user } = this.state;
    const url = type === 'SIGN UP' ? 'register' : 'login';
    if (this.handelValid(type)) {
      return new Promise((resolve, reject) => {
        request.POST(apiUrl('v1', url), user).then((obj) => {
          return obj.token;
        }).then((token) => {
          cookie.write('token', token);
          return new Promise((resolve, reject) => {
            User.get('user').then(() => {
              sendUserInfo(true);
            }).catch((err) => {
              reject(err);
            });
          });
        }).catch((err) => {
          reject(err);
        });
      });
    }
  }

  handlePut() {
    // console.log('handlePut');
    // const { user } = this.state;
    // return new Promise((resolve, reject) => {
    //   request.PUT(apiUrl('v1', 'user'), user).then((obj) => {
    //     return obj.token;
    //   }).then((token) => {
    //     cookie.write('token', token);
    //     return new Promise((resolve, reject) => {
    //       User.get('user').then(() => {
    //         sendUserInfo(true);
    //       }).catch((err) => {
    //         reject(err);
    //       });
    //     });
    //   }).catch((err) => {
    //     reject(err);
    //   });
    // });
  }

  handelValid(type) {
    console.log(type);
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

    const send = type === 'Update' ? this.handlePut : this.handlePost;

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
            onClick={send}
            primary
          />
        </Paper>
      </div>
    );
  }
}
