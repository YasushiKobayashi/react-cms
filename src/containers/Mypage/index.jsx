import React, { Component, PropTypes } from 'react';


import { Archive } from '../../api';
import { ContentList, Login } from '../../components';
import { DropZone, Loading } from '../../parts';
import { request } from '../../utils';
import './index.scss';

export default class Mypage extends Component {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    sendUserInfo: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      archives: null,
      loading: true,
      isDropZone: false,
    };

    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragExit = this.handleDragExit.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
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

  handleUploadImage(file) {
    return new Promise((resolve, reject) => {
      this.uploadImage(file).then(() => {
        resolve(this.props.sendUserInfo(true));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  uploadImage(file) {
    return new Promise((resolve, reject) => {
      request.UPLOAD('user/upload', file).then((obj) => {
        resolve(obj);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  handleDragOver() {
    this.setState({
      isDropZone: true,
    });
  }

  handleDragExit() {
    this.setState({
      isDropZone: false,
    });
  }

  render() {
    const { user } = this.props;
    const { archives, loading, isDropZone } = this.state;
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
          <div styleName='image' onDragOver={this.handleDragOver} handleDragExit={this.handleDragExit} >
            <img src={user.image} alt={user.name} />
            <DropZone
              isDropZone={isDropZone}
              handleDragExit={this.handleDragExit}
              handleUploadImage={this.handleUploadImage}
            />
          </div>
        </div>
        <h2>Contents list</h2>
        <ContentList archives={archives} user={user} />
      </div>
    );
  }
}
