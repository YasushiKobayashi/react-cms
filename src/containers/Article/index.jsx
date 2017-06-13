import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Highlight from 'react-highlight';
import { CommentList, CommentForm } from '../../components';
import { Loading } from '../../parts';
import { Archive, CommentAction } from '../../actions';
import Edit from 'material-ui/svg-icons/image/edit';

import style from '../../style';
import './index.scss';

export default class Article extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      article: null,
      loading: true,
    };

    this.sendComment = this.sendComment.bind(this);
  }

  componentDidMount() {
    return new Promise((resolve, reject) => {
      Archive.getSigleArticle(this.props.params.id).then((obj) => {
        this.setState({
          article: obj,
          loading: false,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  sendComment(e) {
    const content = e.currentTarget.getAttribute('data-content');
    const post = {
      post_id: parseInt(this.props.params.id, 10),
      content: content,
    };
    const { article } = this.state;
    return new Promise((resolve, reject) => {
      CommentAction.postComment(post).then((obj) => {
        article.comments[article.comments.length] = obj;
        this.setState({
          article: article,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }


  render() {
    const { article, loading } = this.state;
    if (loading) return <Loading />;

    const cat = article.categories.map((category) => {
      return (
        <span
          key={category.id}
          styleName='cat'
        >
          {category.name}
        </span>
      );
    });

    const url = `/edit/${article.id}`;
    const iconStyle = Object.assign(style.icon, style.grayTxt, style.topIcon);

    return (
      <div styleName='container'>
        <div styleName='articleTitle'>
          <h1>{article.title}</h1>
          <Link to={url}>
            <Edit style={iconStyle} hoverColor={style.blue} />
          </Link>
        </div>
        {cat}
        <div styleName='content'>
          <Highlight innerHTML>
            {article.htmlContent}
          </Highlight>
        </div>
        <CommentList comments={article.comments} user={this.props.user} />
        <CommentForm sendComment={this.sendComment} />
      </div>
    );
  }
}
