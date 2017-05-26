import React, { Component, PropTypes, cloneElement } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider } from 'material-ui/styles';

import { Loading } from '../../parts';
import Login from './Login';

import Header from './Header';
import { User } from '../../actions';
import theme from '../../theme';
import { cookie } from '../../utils';
import './Index.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isLogin: false,
      isLoading: true,
      user: {
        id: null,
        name: '',
        picture: '',
      },
    };

    this.manageLogin = this.manageLogin.bind(this);
  }

  componentDidMount() {
    injectTapEventPlugin();
    const token = cookie.read('token');
    if (typeof token === 'undefined') {
      this.setState({
        isLoading: false,
      });
    } else {
      new Promise(() => {
        User.get('user').then((obj) => {
          this.setState({
            user: obj,
            isLoading: false,
            isLogin: true,
          });
        }).catch(() => {
          this.setState({
            isLoading: false,
          });
        });
      });
    }
  }

  manageLogin(param) {
    if (!param) cookie.delite('token');
    this.setState({
      isLogin: param,
    });
  }

  render() {
    const {
      user,
      isLogin,
      isLoading,
    } = this.state;

    const children = cloneElement(
      this.props.children,
      { user: user },
    );

    const render = (isLoading) ? <Loading /> :
      (isLogin) ? children : <Login manageLogin={this.manageLogin} />;

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div styleName='container'>
          <Header
            manageLogin={this.manageLogin}
            user={user}
          />
          <div styleName='content'>
            {render}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
