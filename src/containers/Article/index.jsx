/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';
import Highlight from 'react-highlight';
import Edit from 'material-ui/svg-icons/image/edit';

import * as actions from '../../actions/articleAction';
import type { UserType } from '../../types/UserType';
import type { ArticleType } from '../../types/ArticleType';
import { hamlet } from '../../utils';

import { CommentList, CommentForm } from '../../components';
import { Loading } from '../../parts';

import style from '../../style';
import './index.scss';

class Article extends Component {
  props: {
    params: {
      id: number;
    },
    actions: {
      getArticle: Function;
      createComment: Function;
      editComment: Function;
    },
    user: UserType;
    article: {
      article: ArticleType;
      isLoading: boolean;
    },
  };
  createComment: Function;
  editComment: Function;

  constructor() {
    super();
    this.createComment = this.createComment.bind(this);
    this.editComment = this.editComment.bind(this);
  }

  componentWillMount() {
    this.props.actions.getArticle(this.props.params.id);
  }

  createComment(e) {
    const post = {
      post_id: parseInt(this.props.params.id, 10),
      content: e.currentTarget.getAttribute('data-content'),
    };
    this.props.actions.createComment(post);
  }

  editComment(post) {
    this.props.actions.editComment(post);
  }

  render() {
    const { article, isLoading } = this.props.article;
    if (isLoading) return <Loading />;

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
    const wipStyle = article.wpFlg ? null : style.hide;

    return (
      <div styleName='container'>
        <Helmet
          title={hamlet.title(article.title)}
          meta={hamlet.meta(article.title)}
        />
        <div styleName='articleTitle'>
          <h1>
            <span styleName='wip' style={wipStyle} >WIP</span>
            {article.title}
          </h1>
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
        <CommentList
          comments={article.comments} user={this.props.user}
          editComment={this.editComment}
        />
        <CommentForm sendComment={this.createComment} />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    article: state.article,
  };
};
const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapState, mapDispatch)(Article);
