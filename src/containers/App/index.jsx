import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider } from 'material-ui/styles';

import { Loading } from '../../parts';
import Login from './Login';
import Header from './Header';
import { User } from '../../actions';
import theme from '../../theme';
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
        name: null,
        picture: null,
      },
    };
  }

  componentDidMount() {
    injectTapEventPlugin();
    return new Promise((resolve, reject) => {
      User.get('user').then((obj) => {
        console.log(obj);
        this.setState({
          user: obj,
          isLoading: false,
          isLogin: true,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  render() {
    const {
      user,
      isLogin,
      isLoading,
    } = this.state;
    const render = isLoading ? <Loading /> : isLogin ? this.props.children : <Login />;
    console.log(render);
    console.log(isLoading);
    console.log(isLogin);

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div styleName='container'>
          <Header user={user} />
          <div styleName='content'>
            {render}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
