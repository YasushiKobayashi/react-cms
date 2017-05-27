import React, { Component, PropTypes } from 'react';
import Highlight from 'react-highlight';
import Edit from 'material-ui/svg-icons/image/edit';
import md from 'markdown-it';
import moment from 'moment';
import _ from 'lodash';

import { CommentForm } from '../../components';
import { CommentAction } from '../../actions';
import style from '../../style';
import './index.scss';

export default class CommentList extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      created: PropTypes.date,
      updated: PropTypes.date,
      content: PropTypes.string,
      user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        image: PropTypes.string,
      }),
    })),
  }
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

  editMode(e) {
    const id = e.currentTarget.getAttribute('data-id');
    const { comments } = this.state;
    const commentsId = _.findIndex(comments, { id: parseInt(id, 10) });
    comments[commentsId].edit = (!comments[commentsId].edit);
    this.setState({
      comments: comments,
    });
  }

  sendComment(e) {
    const id = e.currentTarget.getAttribute('data-id');
    const content = e.currentTarget.getAttribute('data-content');
    const { comments } = this.state;
    const commentsId = _.findIndex(comments, { id: parseInt(id, 10) });

    const param = {
      content: content,
    };
    return new Promise((resolve, reject) => {
      CommentAction.putComment(id, param).then((obj) => {
        comments[commentsId].content = obj.content;
        comments[commentsId].updated = obj.updated;
        comments[commentsId].edit = false;
        this.setState({
          comments: comments,
        });
      }).catch((err) => {
        reject(err);
      });
    });
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
        <Highlight innerHTML>{md().render(comment.content)}</Highlight>;

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
