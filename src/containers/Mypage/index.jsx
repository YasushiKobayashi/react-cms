/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';

import * as actions from '../../actions/userAction';
import type { UserType } from '../../types/UserType';
import type { ArticleType } from '../../types/ArticleType';
import * as constant from '../../constant';
import { request, hamlet } from '../../utils';

import { ContentList, Login } from '../../components';
import { DropZone, Loading, Modal } from '../../parts';
import './index.scss';

class Mypage extends Component {
  props: {
    user: UserType;
    actions: {
      setUserInfo: Function;
      getUserInfo: Function;
      updateUserInfo: Function;
    },
    mypage: {
      user: UserType;
      archives: Array<ArticleType>;
      isLoading: boolean;
      msessage: string;
    },
  };
  state: {
    isDropZone: boolean;
    isModalOpen: boolean;
  };
  setState: Function;
  handleDrag: Function;
  handleUploadImage: Function;
  updateUserInfo: Function;
  handleModal: Function;

  constructor() {
    super();
    this.state = {
      isDropZone: false,
      isModalOpen: false,
    };

    this.handleDrag = this.handleDrag.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  componentWillMount() {
    this.props.actions.setUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mypage.msessage !== '') {
      this.handleModal();
    }
  }

  updateUserInfo(user: UserType) {
    this.props.actions.updateUserInfo(user);
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

  handleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    const { archives, isLoading, user, msessage } = this.props.mypage;
    const { isDropZone, isModalOpen } = this.state;
    if (isLoading) return <Loading />;

    return (
      <div styleName='content'>
        <Helmet
          title={hamlet.title(constant.TITLE_MYPAGE)}
          meta={hamlet.meta(constant.TITLE_MYPAGE)}
        />
        <div styleName='loginWrapper'>
          <div styleName='login'>
            <Login
              type='Update'
              user={user}
              sendUserInfo={this.updateUserInfo}
            />
          </div>
          <div styleName='image' onDragOver={this.handleDrag} onDragLeave={this.handleDrag} >
            <img src={this.props.user.image} alt={this.props.user.name} />
            <DropZone
              isDropZone={isDropZone}
              handleDragExit={this.handleDrag}
              handleUploadImage={this.handleUploadImage}
            />
          </div>
        </div>
        <h2>Contents list</h2>
        <ContentList archives={archives} user={user} />
        <Modal
          message={msessage}
          isModalOpen={isModalOpen}
          handleModal={this.handleModal}
        />
      </div>
    );
  }
}

const mapState = (state) => {
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
