import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import PinDrop from 'material-ui/svg-icons/maps/pin-drop';

import style from '../../style';
import './index.scss';

export default class DropZone extends Component {
  static propTypes = {
    dropZone: PropTypes.bool.isRequired,
    handleUploadImage: PropTypes.func.isRequired,
    handleDragExit: PropTypes.func.isRequired,
    tabValue: PropTypes.string,
  }
  static defaultProps = {
    tabValue: '',
  }
  constructor() {
    super();
    this.state = {
      dropZone: false,
    };
  }

  componentWillMount() {
    this.setState({
      dropZone: this.props.dropZone,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dropZone: nextProps.dropZone,
    });
  }

  render() {
    const { tabValue, handleUploadImage, handleDragExit } = this.props;
    const { dropZone } = this.state;

    const dropStyle = (dropZone) ? style.show : style.hide;

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