import React, { Component, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider } from 'material-ui/styles';

import { cookie } from '../../utils';
import { Loading } from '../../parts';
import LoginComponent from './LoginComponent';

import Header from './Header';
import { User } from '../../actions';
import theme from '../../theme';
import './index.scss';

class App extends Component {
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
        email: '',
        image: '',
      },
    };

    this.sendUserInfo = this.sendUserInfo.bind(this);
  }

  componentWillMount() {
    const token = cookie.read('token');
    if (typeof token === 'undefined') {
      this.setState({
        isLoading: false,
      });
    }
  }

  componentDidMount() {
    injectTapEventPlugin();
    const token = cookie.read('token');
    if (typeof token !== 'undefined') {
      new Promise(() => {
        this.getUserInfo().then((obj) => {
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

  getUserInfo() {
    return new Promise((resolve, reject) => {
      User.get('user').then((obj) => {
        resolve(obj);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  sendUserInfo(param) {
    if (!param) cookie.delite('token');
    this.setState({
      isLogin: param,
    });
    new Promise(() => {
      this.getUserInfo().then((obj) => {
        this.setState({
          user: obj,
          isLoading: false,
          isLogin: true,
        });
      }).catch(() => {
        cookie.delite('token');
        this.setState({
          isLoading: false,
        });
      });
    });
  }

  render() {
    const {
      user,
      isLogin,
      isLoading,
    } = this.state;

    console.log(this.props.app);

    const children = cloneElement(
      this.props.children,
      {
        user: user,
        sendUserInfo: this.sendUserInfo,
      },
    );

    const render = (isLoading) ? <Loading /> :
      (isLogin) ? children : <LoginComponent sendUserInfo={this.sendUserInfo} user={user} />;

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div styleName='container'>
          <Header
            sendUserInfo={this.sendUserInfo}
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

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(
  mapStateToProps,
)(App);
