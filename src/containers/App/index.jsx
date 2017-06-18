/* @flow */
import React, { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider } from 'material-ui/styles';

import * as actions from '../../actions/userAction';
import type { UserType } from '../../types/UserType';

import { Loading } from '../../parts';
import LoginComponent from './LoginComponent';
import Header from './Header';

import theme from '../../theme';
import './index.scss';

class App extends Component {
  props: {
    /* eslint-disable no-undef, no-console */
    children: React$Element<*>,
    /* eslint-disable no-undef, no-console */
    actions: {
      regist: Function;
      login: Function;
      logout: Function;
    },
    app: {
      user: UserType;
      isLoading: boolean;
      isLogin: boolean;
    },
  };
  componentWillMount() {
    injectTapEventPlugin();
  }

  render() {
    const { isLoading, isLogin, user } = this.props.app;

    const {
      login,
      regist,
      logout,
    } = this.props.actions;

    const children = cloneElement(
      this.props.children,
      {
        user: user,
      },
    );

    const render = (isLoading) ? <Loading /> :
      (isLogin) ? children : <LoginComponent login={login} regist={regist} user={user} />;

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div styleName='container'>
          <Header
            logout={logout}
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

const mapState = (state) => {
  return {
    app: state.app,
  };
};
const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapState, mapDispatch)(App);
