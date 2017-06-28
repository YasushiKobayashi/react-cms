/* @flow */
import React, { Component } from 'react';
import { Dialog } from 'material-ui';

export default class Modal extends Component {
  props: {
    message: string;
    isModalOpen: boolean;
    handleModal: Function;
  };

  render() {
    const { message, isModalOpen, handleModal } = this.props;
    return (
      <Dialog
        onRequestClose={handleModal}
        modal={false}
        open={isModalOpen}
      >
        {message}
      </Dialog>
    );
  }
}
