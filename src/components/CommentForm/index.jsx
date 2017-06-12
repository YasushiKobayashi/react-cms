import React, { Component } from 'react';
import Highlight from 'react-highlight';
import { RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

import { DropZone } from '../../parts';
import { request, convertMdtoHtml } from '../../utils';
import style from '../../style';
import './index.scss';

const tabComment = 'comment';
const tabPrev = 'preveiw';

export default class CommentForm extends Component {
  props: {
    sendComment: Function,
    comment?: {
      content: String,
    },
  };
  static defaultProps = {
    comment: {
      id: null,
      content: '',
    },
  }

  constructor() {
    super();
    this.state = {
      content: '',
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

  componentWillMount() {
    this.setState({
      content: this.props.comment.content,
    });
  }

  handleTab(value) {
    this.setState({
      tabValue: value,
    });
  }

  handleComment(event) {
    this.setState({
      content: event.target.value,
      selectionStart: event.target.selectionStart,
    });
  }

  handleUploadImage(file) {
    const { content, selectionStart } = this.state;
    return new Promise((resolve, reject) => {
      this.uploadImage(file).then((imagePath) => {
        const addStr = `\n![](${imagePath})\n`;
        const newContent = this.insertStr(content, selectionStart, addStr);
        this.setState({
          content: newContent,
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
      request.UPLOAD('post/upload', file).then((obj) => {
        resolve(obj.path);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  handleDragOver() {
    this.setState({ isDropZone: true });
  }

  handleDragExit() {
    this.setState({ isDropZone: false });
  }

  render() {
    const { sendComment, comment } = this.props;
    const {
      content,
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
              value={content}
              onChange={this.handleComment}
              onDragOver={this.handleDragOver}
            />
          </Tab>
          <Tab label={tabPrev} value={tabPrev}>
            <Highlight styleName='content' innerHTML>
              {convertMdtoHtml(content)}
            </Highlight>
          </Tab>
        </Tabs>
        <RaisedButton
          label='SEND'
          onClick={sendComment}
          data-id={comment.id}
          data-content={content}
          style={style.catagoryBtn}
          icon={<CommentIcon style={style.icon} />}
          primary
        />
        <DropZone
          isDropZone={isDropZone}
          handleDragExit={this.handleDragExit}
          handleUploadImage={this.handleUploadImage}
        />
      </div>
    );
  }
}
