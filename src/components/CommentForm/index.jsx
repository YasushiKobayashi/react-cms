import React, { Component, PropTypes } from 'react';
import Highlight from 'react-highlight';
import md from 'markdown-it';
import { RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

import { DropZone } from '../../parts';
import { request } from '../../utils';
import style from '../../style';
import './index.scss';

const tabComment = 'comment';
const tabPrev = 'preveiw';

export default class CommentForm extends Component {
  static propTypes = {
    sendComment: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      comment: '',
      tabValue: tabComment,
      isDropZone: false,
      selectionStart: 0,
    };

    this.handleTab = this.handleTab.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragExit = this.handleDragExit.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleTab(value) {
    this.setState({
      tabValue: value,
    });
  }

  handleComment(event) {
    this.setState({
      comment: event.target.value,
      selectionStart: event.target.selectionStart,
    });
  }

  handleUploadImage(file) {
    const { comment, selectionStart } = this.state;
    return new Promise((resolve, reject) => {
      this.uploadImage(file).then((imagePath) => {
        const addStr = `\n![](${imagePath})\n`;
        const content = this.insertStr(comment, selectionStart, addStr);
        this.setState({
          comment: content,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  insertStr(str, index, insert) {
    return str.slice(0, index) + insert + str.slice(index, str.length);
  }

  uploadImage(file) {
    return new Promise((resolve, reject) => {
      request.UPLOAD('upload', file).then((obj) => {
        resolve(obj.path);
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
    const { sendComment } = this.props;
    const {
      comment,
      tabValue,
      isDropZone,
    } = this.state;

    return (
      <div styleName='container'>
        <Tabs
          value={tabValue}
          onChange={this.handleTab}
          style={{
            width: '100%',
          }}
        >
          <Tab label={tabComment} value={tabComment}>
            <textarea
              value={comment}
              onChange={this.handleComment}
              onDragOver={this.handleDragOver}
            />
          </Tab>
          <Tab label={tabPrev} value={tabPrev}>
            <Highlight styleName='content' innerHTML>
              {md().render(comment)}
            </Highlight>
          </Tab>
        </Tabs>
        <RaisedButton
          label='SEND'
          onClick={() => { sendComment(comment); }}
          style={style.catagoryBtn}
          icon={<CommentIcon style={style.icon} />}
          primary
        />
        <DropZone
          isDropZone={isDropZone}
          tabValue={tabValue}
          handleDragExit={this.handleDragExit}
          handleUploadImage={this.handleUploadImage}
        />
      </div>
    );
  }
}
