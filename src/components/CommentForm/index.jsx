/* @flow */
import React, { Component } from 'react';
import Highlight from 'react-highlight';
import { RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

import type { CommentType } from '../../types/CommentType';
import { request, editContent } from '../../utils';


import { DropZone } from '../../parts';
import style from '../../style';
import './index.scss';

const tabComment = 'comment';
const tabPrev = 'preveiw';

export default class CommentForm extends Component {
  props: {
    sendComment: Function;
    comment: CommentType;
  };
  static defaultProps = {
    comment: {
      id: null,
      content: '',
    },
  }

  state: {
    content: string,
    tabValue: string,
    isDropZone: boolean,
    selectionStart: number,
  }
  setState: Function;
  handleTab: Function;
  handleComment: Function;
  handleDrag: Function;
  handleUploadImage: Function;

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
    this.handleDrag = this.handleDrag.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  componentWillMount() {
    this.setState({
      content: this.props.comment.content,
    });
  }

  handleTab(value: string) {
    this.setState({
      tabValue: value,
    });
  }

  handleComment(event: any) {
    this.setState({
      content: event.target.value,
      selectionStart: event.target.selectionStart,
    });
  }

  handleUploadImage(file: any) {
    const { content, selectionStart } = this.state;
    (async () => {
      try {
        const imagePath = await request.UPLOAD('post/upload', file);
        const addStr = `\n![](${imagePath.path})\n`;
        const newContent = editContent.insertStr(content, selectionStart, addStr);
        this.setState({
          content: newContent,
        });
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
              onDragOver={this.handleDrag}
            />
          </Tab>
          <Tab label={tabPrev} value={tabPrev}>
            <Highlight styleName='content' innerHTML>
              {editContent.toHtml(content)}
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
          handleDragExit={this.handleDrag}
          handleUploadImage={this.handleUploadImage}
        />
      </div>
    );
  }
}
