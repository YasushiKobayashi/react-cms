/* @flow */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PinDrop from 'material-ui/svg-icons/maps/pin-drop';

import style from '../../style';
import './index.scss';

export default class DropZone extends Component {
  props: {
    isDropZone: boolean;
    tabValue: string;
    handleUploadImage: Function,
    handleDragExit: Function,
  };
  state: {
    isDropZone: boolean;
  };
  static defaultProps = {
    tabValue: '',
  }
  constructor() {
    super();
    this.state = {
      isDropZone: false,
    };
  }

  componentWillMount() {
    this.setState({
      isDropZone: this.props.isDropZone,
    });
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({
      isDropZone: nextProps.isDropZone,
    });
  }

  render() {
    const { tabValue, handleUploadImage, handleDragExit } = this.props;
    const { isDropZone } = this.state;

    const dropStyle = (isDropZone) ? style.show : style.hide;

    return (
      <Dropzone
        style={dropStyle}
        styleName='drop'
        onDrop={(file) => { handleUploadImage(file, tabValue); }}
        onDropAccepted={handleDragExit}
        onDragLeave={handleDragExit}
        onDropRejected={handleDragExit}
        accept='image/*'
      ><p><PinDrop style={style.icon} /><br />Drop image</p>
      </Dropzone>
    );
  }
}
