import React, { Component, PropTypes } from 'react';


import { Archive } from '../../actions';
import { ContentList, Login } from '../../components';
import { Loading } from '../../parts';
import './index.scss';

export default class Mypage extends Component {
  static propTypes = {
    user: PropTypes.shape().isRequired,
  };

  constructor() {
    super();
    this.state = {
      archives: null,
      loading: true,
    };
  }

  componentDidMount() {
    return new Promise((resolve, reject) => {
      Archive.getList('post/user').then((obj) => {
        return obj;
      }).then((obj) => {
        this.setState({
          archives: obj,
          loading: false,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  sendUserInfo() {

  }

  render() {
    const { user } = this.props;
    const { archives, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <div styleName='content'>
        <div styleName='loginWrapper'>
          <div styleName='login'>
            <Login
              type='Update'
              user={user}
              sendUserInfo={this.sendUserInfo}
            />
          </div>
          <div styleName='image'>
            <img src={user.image} alt={user.name} />
          </div>
        </div>
        <h2>Contents list</h2>
        <ContentList archives={archives} user={user} />
      </div>
    );
  }
}
