import React, { Component, PropTypes } from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';
import _ from 'lodash';

import style from '../../style';
import { request, validation, apiUrl, cookie } from '../../utils';
import { User } from '../../actions';
import './index.scss';

export default class Login extends Component {
  static propTypes = {
    manageLogin: PropTypes.func,
    type: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }
  static defaultProps = {
    user: {
      name: '',
      email: '',
    },
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
    this.handleSend = this.handleSend.bind(this);
  }

  componentWillMount() {
    const { user } = this.props;
    this.setState({
      user: {
        name: user.name,
        email: user.email,
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

  handleSend() {
    const { type, manageLogin } = this.props;
    const { user, userError } = this.state;
    let url;
    if (type === 'SIGN UP') {
      userError.name = validation.validEmpty(user.name, '名前');
      url = 'register';
    } else {
      url = 'login';
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

    return new Promise((resolve, reject) => {
      request.POST(apiUrl('v1', url), user).then((obj) => {
        return obj.token;
      }).then((token) => {
        cookie.write('token', token);
        return new Promise((resolve, reject) => {
          User.get('user').then(() => {
            manageLogin(true);
          }).catch((err) => {
            reject(err);
          });
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  render() {
    const { type } = this.props;
    const {
      user,
      userError,
    } = this.state;

    const name = type === 'SIGN UP' ? (<TextField
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
            onClick={this.handleSend}
            primary
          />
        </Paper>
      </div>
    );
  }
}
