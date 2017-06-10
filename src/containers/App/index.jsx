import React, { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider } from 'material-ui/styles';

import * as actions from '../../actions/appAction';
import type { User } from '../../types/User';

import { Loading } from '../../parts';
import LoginComponent from './LoginComponent';
import Header from './Header';

import theme from '../../theme';
import './index.scss';

class App extends Component {
  props: {
    children: Array<Component>,
    app: {
      user: User,
    },
    actions: Array<Function>,
  };

  state: {
    isLoading: boolean,
    isLogin: boolean,
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      isLogin: false,
    };
  }

  componentWillMount() {
    injectTapEventPlugin();
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading, isLogin } = nextProps.app;
    this.setState({
      isLoading: isLoading,
      isLogin: isLogin,
    });
  }

  render() {
    const { isLoading, isLogin } = this.state;
    const { user } = this.props.app;

    const {
      login,
      logout,
    } = this.props.actions;

    const children = cloneElement(
      this.props.children,
      {
        user: user,
        sendUserInfo: this.sendUserInfo,
      },
    );

    const render = (isLoading) ? <Loading /> :
      (isLogin) ? children : <LoginComponent login={login} user={user} />;

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
