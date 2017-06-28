/* @flow */
import React, { Component } from 'react';

import type { UserType } from '../../types/UserType';

import { Login } from '../../components';
import { Modal } from '../../parts';
import './LoginComponent.scss';

export default class LoginComponent extends Component {
  props: {
    signUpUser: UserType;
    signInUser: UserType;
    message: string;
    regist: Function;
    login: Function;
  };
  state: {
    isModalOpen: boolean;
  };
  setState: Function;
  handleModal: Function;
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
    };

    this.handleModal = this.handleModal.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.message !== '') {
      this.handleModal();
    }
  }

  handleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    const { isModalOpen } = this.state;
    const {
      signUpUser,
      signInUser,
      login,
      regist,
      message,
    } = this.props;

    return (
      <div styleName='conteiner'>
        <div styleName='content'>
          <Login
            type='SIGN UP'
            sendUserInfo={regist}
            user={signUpUser}
          />
        </div>
        <div styleName='content'>
          <Login
            type='SIGN IN'
            sendUserInfo={login}
            user={signInUser}
          />
        </div>
        <Modal
          message={message}
          isModalOpen={isModalOpen}
          handleModal={this.handleModal}
        />
      </div>
    );
  }
}
