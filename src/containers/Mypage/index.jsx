/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/userAction';
import type { UserType } from '../../types/UserType';
import type { ArticleType } from '../../types/ArticleType';
import { request } from '../../utils';

import { ContentList, Login } from '../../components';
import { DropZone, Loading } from '../../parts';
import './index.scss';

class Mypage extends Component {
  props: {
    actions: Array<Function>,
    user: UserType,
    actions: {
      getUserArticle: Function,
      getUserInfo: Function,
    },
    mypage: {
      archives: Array<ArticleType>;
      isLoading: boolean,
    },
  };
  state: {
    isDropZone: boolean;
  }
  setState: Function;
  handleDrag: Function;
  handleUploadImage: Function;
  updateUserInfo: Function;

  constructor() {
    super();
    this.state = {
      isDropZone: false,
    };

    this.handleDrag = this.handleDrag.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  componentWillMount() {
    this.props.actions.getUserArticle();
  }

  updateUserInfo() {

  }

  handleUploadImage(file: any) {
    (async () => {
      try {
        await request.UPLOAD('user/upload', file);
        this.props.actions.getUserInfo();
      } catch (e) {
        console.log(e);
      }
    })();
  }

  handleDrag() {
    this.setState({
      isDropZone: !this.state.isDropZone,
    });
  }

  render() {
    const { user } = this.props;
    const { archives, isLoading } = this.props.mypage;
    const { isDropZone } = this.state;
    if (isLoading) return <Loading />;

    return (
      <div styleName='content'>
        <div styleName='loginWrapper'>
          <div styleName='login'>
            <Login
              type='Update'
              user={user}
              updateUserInfo={this.updateUserInfo}
            />
          </div>
          <div styleName='image' onDragOver={this.handleDrag} onDragLeave={this.handleDrag} >
            <img src={user.image} alt={user.name} />
            <DropZone
              isDropZone={isDropZone}
              handleDragExit={this.handleDrag}
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

const mapState = (state) => {
  console.log(state.mypage);
  return {
    mypage: state.mypage,
  };
};
const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapState, mapDispatch)(Mypage);
