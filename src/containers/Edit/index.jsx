/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { TextField, RaisedButton } from 'material-ui';

import * as actions from '../../actions/articleAction';
import type { ArticleType } from '../../types/ArticleType';
import type { CategoryType } from '../../types/CategoryType';
import type { UserType } from '../../types/UserType';
import type { ValidType } from '../../types/ValidType';
import * as constant from '../../constant';

import { editContent, request, hamlet } from '../../utils';

import EditArticle from './EditArticle';
import EditSide from './EditSide';
import { CommentList, CategoryFrom } from '../../components';
import { Loading, Categories } from '../../parts';
import style from '../../style';
import './index.scss';

const tabMark = 'markdown';
const tabHtml = 'html';

class Edit extends Component {
  props: {
    params: {
      id?: number;
    },
    user: UserType;
    location: any;
    actions: {
      initArticle: Function;
      getCategories: Function;
      getArticle: Function;
      editCatSlug: Function;
      editCatName: Function;
      createCategory: Function;
      removeCategories: Function;
      addCategories: Function;
      editArticle: Function;
      createArticle: Function;
      putArticle: Function;
    },
    edit: {
      article: ArticleType;
      categoryLists: Array<CategoryType>;
      isLoading: boolean;
      categoryNew: CategoryType;
      valid: ValidType;
    },
  };
  state: {
    selectionStart: number;
  };
  setState: Function;
  handleTitle: Function;
  handleContent: Function;
  handleUploadImage: Function;
  manegeContent: Function;
  sendArticle: Function;
  handleAddCat: Function;
  handleRemoveCat: Function;

  constructor() {
    super();
    this.state = {
      selectionStart: 0,
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.manegeContent = this.manegeContent.bind(this);
    this.sendArticle = this.sendArticle.bind(this);
    this.handleAddCat = this.handleAddCat.bind(this);
    this.handleRemoveCat = this.handleRemoveCat.bind(this);
  }

  componentWillMount() {
    this.props.actions.initArticle();
    this.props.actions.getCategories();
    if (typeof this.props.params.id !== 'undefined') {
      this.props.actions.getArticle(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.actions.initArticle();
      this.props.actions.getCategories();
    }
  }

  handleTitle(e) {
    const { article } = this.props.edit;
    article.title = e.target.value;
    this.props.actions.editArticle(article);
  }

  handleContent(e, type) {
    this.setState({
      selectionStart: e.target.selectionStart,
    });
    this.manegeContent(e.target.value, type);
  }

  manegeContent(newContent, type) {
    const { article } = this.props.edit;
    if (type === 'markdown') {
      article.content = newContent;
      article.htmlContent = editContent.toHtml(newContent);
    } else {
      article.content = editContent.toMarkdown(newContent);
      article.htmlContent = newContent;
    }
    this.props.actions.editArticle(article);
  }
  handleUploadImage(file, type) {
    const { selectionStart } = this.state;
    const { article } = this.props.edit;
    (async () => {
      try {
        const upload = await request.UPLOAD('post/upload', file);
        const imagePath = upload.path;
        const addStr = (type === 'markdown') ? `\n![](${imagePath})\n` :
          `\n<p><img src="${imagePath}" ></p>\n`;

        let content = (type === 'markdown') ? article.content : article.htmlContent;
        content = editContent.insertStr(content, selectionStart, addStr);
        this.manegeContent(content, type);
      } catch (e) {
        console.log(e);
      }
    })();
  }

  sendArticle(flag) {
    if (typeof this.props.params.id === 'undefined') {
      this.props.actions.createArticle(flag);
    } else {
      const post = {
        flag: flag,
        id: this.props.params.id,
      };
      this.props.actions.putArticle(post);
    }
  }

  handleAddCat(e) {
    const id = e.currentTarget.getAttribute('data-id');
    this.props.actions.addCategories(id);
  }

  handleRemoveCat(e) {
    const id = e.currentTarget.getAttribute('data-id');
    this.props.actions.removeCategories(id);
  }

  render() {
    const {
      article,
      isLoading,
      categoryLists,
      categoryNew,
      valid,
    } = this.props.edit;
    const {
      editCatName,
      editCatSlug,
      createCategory,
    } = this.props.actions;
    if (isLoading) return <Loading />;

    return (
      <div>
        <div styleName='container'>
          <Helmet
            title={hamlet.title(constant.TITLE_EDIT)}
            meta={hamlet.meta(constant.TITLE_EDIT)}
          />
          <div styleName='content'>
            <TextField
              floatingLabelText='title'
              value={article.title}
              onChange={this.handleTitle}
              errorText={valid.titleError}
              style={style.titleField}
            />
            <EditArticle
              content={article.content}
              htmlContent={article.htmlContent}
              tabMark={tabMark}
              tabHtml={tabHtml}
              handleContent={this.handleContent}
              handleUploadImage={this.handleUploadImage}
            />
            <h3>category lists</h3>
            <Categories
              categories={categoryLists}
              handleCat={this.handleAddCat}
              type='list'
            />
            <h3>category add</h3>
            <CategoryFrom
              createCategory={createCategory}
              editCatName={editCatName}
              editCatSlug={editCatSlug}
              categoryNew={categoryNew}
              valid={valid}
            />
          </div>
          <div styleName='content'>
            <EditSide
              article={article}
              categories={article.categories}
              handleCat={this.handleRemoveCat}
            />
          </div>
        </div>
        <div styleName='btnWrapper'>
          <RaisedButton
            label='SAVE'
            styleName='btn'
            onClick={() => { this.sendArticle(false); }}
            primary
          />
          <RaisedButton
            label='SAVE AS WIP'
            styleName='btn'
            onClick={() => { this.sendArticle(true); }}
            secondary
          />
        </div>
        <CommentList comments={article.comments} user={this.props.user} />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    edit: state.edit,
  };
};
const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapState, mapDispatch)(Edit);
