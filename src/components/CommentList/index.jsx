import React, { Component } from 'react';
import Highlight from 'react-highlight';
import Edit from 'material-ui/svg-icons/image/edit';
import moment from 'moment';
import _ from 'lodash';

import type { User } from '../../types/User';
import type { Comment } from '../../types/Comment';

import { CommentForm } from '../../components';
import style from '../../style';
import './index.scss';

export default class CommentList extends Component {
  props: {
    comments: Array<Comment>,
    user: User,
    editComment: Function,
  };
  static defaultProps = {
    comments: [],
  }
  constructor() {
    super();
    this.state = {
      comments: [],
    };

    this.editMode = this.editMode.bind(this);
    this.sendComment = this.sendComment.bind(this);
  }

  componentWillMount() {
    this.setState({
      comments: this.props.comments,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      comments: nextProps.comments,
    });
  }

  editMode(e) {
    const id = e.currentTarget.getAttribute('data-id');
    const { comments } = this.props;
    const commentsId = _.findIndex(comments, { id: parseInt(id, 10) });
    comments[commentsId].edit = (!comments[commentsId].edit);
    this.setState({
      comments: comments,
    });
  }

  sendComment(e) {
    const id = e.currentTarget.getAttribute('data-id');
    const content = e.currentTarget.getAttribute('data-content');
    const post = {
      id: id,
      content: content,
    };
    this.props.editComment(post);
  }

  render() {
    const { user } = this.props;
    const { comments } = this.state;
    const iconStyle = Object.assign(style.icon, style.grayTxt, style.topIcon);

    const commentList = comments.map((comment) => {
      const created = moment(comment.created).format('YYYY/MM/DD');
      const updated = moment(comment.updated).format('YYYY/MM/DD');

      const editBtn = comment.user.id === user.id ?
        <Edit
          styleName='edit' style={iconStyle} hoverColor={style.blue}
          onClick={this.editMode} data-id={comment.id}
        />
        : false;

      const content = comment.edit ?
        <CommentForm sendComment={this.sendComment} comment={comment} /> :
        <Highlight innerHTML>{comment.htmlContent}</Highlight>;

      return (
        <div
          styleName='commment'
          key={comment.id}
        >
          <div styleName='author'>
            <img src={comment.user.image} alt={comment.user.name} />
            <br />
            {comment.user.name}
            <br />
            created {created}
            <br />
            updated {updated}
          </div>
          <div styleName='comment'>
            {content}
            {editBtn}
          </div>
        </div>
      );
    });

    return (
      <div styleName='commentList'>
        {commentList}
      </div>
    );
  }
}
