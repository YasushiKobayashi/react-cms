import React, { Component, PropTypes } from 'react';


import { Archive } from '../../actions';
import { ContentList, Login } from '../../components';
import { Loading } from '../../parts';
import './index.scss';

export default class Mypage extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
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

  render() {
    const { archives, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <div styleName='content'>
        <div styleName='login'>
          <Login type='Update' />
        </div>
        <h2>Contents list</h2>
        <ContentList archives={archives} user={this.props.user} />
      </div>
    );
  }
}
