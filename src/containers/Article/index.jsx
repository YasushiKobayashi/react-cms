import React, { Component, PropTypes } from 'react';
import Highlight from 'react-highlight';

import Comment from './Comment';
import { CommentList } from '../../components';
import { Loading } from '../../parts';
import { Archive, CommentAction } from '../../actions';
import './Index.scss';

export default class Single extends Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      single: null,
      loading: true,
    };

    this.sendComment = this.sendComment.bind(this);
  }

  componentDidMount() {
    return new Promise((resolve, reject) => {
      Archive.getSigleArticle(this.props.params.id).then((obj) => {
        this.setState({
          single: obj,
          loading: false,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  sendComment(params) {
    const post = {
      post_id: parseInt(this.props.params.id, 10),
      content: params,
    };
    const { single } = this.state;
    return new Promise((resolve, reject) => {
      CommentAction.postComment(post).then((obj) => {
        single.comments[single.comments.length] = obj;
        this.setState({
          single: single,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }


  render() {
    const { single, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <div styleName='container'>
        <h1>{single.title}</h1>
        <div styleName='content'>
          <Highlight innerHTML>
            {single.htmlContent}
          </Highlight>
        </div>
        <Comment sendComment={this.sendComment} />
        <CommentList comments={single.comments} />
      </div>
    );
  }
}
