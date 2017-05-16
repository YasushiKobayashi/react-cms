import React, { Component, PropTypes } from 'react';
import Highlight from 'react-highlight';

import './index.scss';

export default class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
      dateObj: PropTypes.date,
      content: PropTypes.string,
    })),
  }
  static defaultProps = {
    comments: [],
  }

  render() {
    const { comments } = this.props;

    const commentList = comments.map((comment) => {
      return (
        <div
          styleName='commment'
          key={comment.id}
        >
          <div styleName='author'>
            hogehogeだよ
          </div>
          <div styleName='comment'>
            <Highlight innerHTML>
              {comment.content}
            </Highlight>
          </div>
        </div>
      );
    });

    return (
      <div>
        {commentList}
      </div>
    );
  }
}
