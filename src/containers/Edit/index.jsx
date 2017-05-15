import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton } from 'material-ui';
import md from 'markdown-it';
import toMarkdown from 'to-markdown';
import { pull, map } from 'lodash';

import { Archive, Category } from '../../actions';
import { request, validation } from '../../utils';
import EditArticle from './EditArticle';
import EditSide from './EditSide';
import { Loading, Categories, CategoryFrom } from '../../parts';
import style from '../../style';
import './Index.scss';

const tabMark = 'markdown';
const tabHtml = 'html';

export default class Edit extends Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  };
  static defaultProps = {
    params: {
      id: '',
    },
  }

  constructor() {
    super();
    this.state = {
      article: {
        title: '',
        content: '',
        htmlContent: '',
      },
      categories: [],
      categoryLists: [],
      loading: true,
      titleError: false,
      catNameError: '',
      catSlugErrror: '',
      selectionStart: 0,
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.sendArticle = this.sendArticle.bind(this);
    this.manegeContent = this.manegeContent.bind(this);
    this.handleAddCat = this.handleAddCat.bind(this);
    this.handleRemoveCat = this.handleRemoveCat.bind(this);
    this.handleAddCatList = this.handleAddCatList.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  componentDidMount() {
    new Promise((resolve, reject) => {
      this.getCategories().then((obj) => {
        this.setState({
          categoryLists: obj,
          loading: false,
        });
      }).catch((err) => {
        reject(err);
      });
    });

    if (typeof this.props.params.id !== 'undefined') {
      new Promise((resolve, reject) => {
        this.getArticle().then((obj) => {
          this.setState({
            article: obj,
          });
        }).catch((err) => {
          reject(err);
        });
      });
    }
  }

  getArticle() {
    return new Promise((resolve, reject) => {
      Archive.getSigleArticle(this.props.params.id).then((obj) => {
        resolve(obj);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      Category.get().then((obj) => {
        resolve(obj);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  handleTitle(event) {
    const val = event.target.value;
    const valid = validation.validTitle(val);
    const { article } = this.state;
    article.title = val;
    this.setState({
      article: article,
      titleError: valid,
    });
  }

  handleContent(event, type) {
    const content = event.target.value;
    const selectionStart = event.target.selectionStart;
    const newContent = (type === 'html') ? toMarkdown(content) : content;
    const htmlContent = (type === 'markdown') ? md().render(content) : content;
    this.manegeContent(newContent, htmlContent, selectionStart);
  }

  handleUploadImage(file, type) {
    const { article, selectionStart } = this.state;
    return new Promise((resolve, reject) => {
      request.UPLOAD('upload', file).then((obj) => {
        const imagePath = obj.path;
        let content = (type === 'markdown') ? article.content : article.htmlContent;
        const addStr = (type === 'markdown') ? `\n![](${imagePath})\n` : `\n<p><img src="${imagePath}" ></p>\n`;
        content = this.insertStr(content, selectionStart, addStr);
        const newContent = (type === 'markdown') ? content : toMarkdown(content);
        const htmlContent = (type === 'markdown') ? md().render(content) : content;
        resolve(this.manegeContent(newContent, htmlContent, selectionStart));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  insertStr(str, index, insert) {
    return str.slice(0, index) + insert + str.slice(index, str.length);
  }

  manegeContent(newContent, htmlContent, selectionStart) {
    const { article } = this.state;
    this.setState({
      selectionStart: selectionStart,
      article: {
        title: article.title,
        content: newContent,
        htmlContent: htmlContent,
      },
    });
  }

  sendArticle(wpFlg) {
    const {
      article,
      categories,
    } = this.state;
    const params = {
      title: article.title,
      content: article.content,
      wp_flg: wpFlg,
      categories: map(categories, 'id'),
    };

    new Promise((resolve, reject) => {
      this.postArchive(params).then((obj) => {
        browserHistory.push(`/article.${obj.id}`);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  postArchive(params) {
    return new Promise((resolve, reject) => {
      Archive.postArticle(params).then((obj) => {
        resolve(obj);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  handleAddCatList(categoryNew) {
    const {
      categories,
    } = this.state;
    const catValid = validation.validEmpty(categoryNew.name, 'カテゴリ');
    const slugValid = validation.validNonJpanese(categoryNew.slug, 'スラッグ');

    if (catValid || slugValid) {
      this.setState({
        catNameError: catValid,
        catSlugErrror: slugValid,
      });
    } else {
      new Promise((resolve, reject) => {
        this.postCategory(categoryNew).then((obj) => {
          categories[categories.length] = obj;
          this.setState({
            categories: categories,
            catNameError: catValid,
            catSlugErrror: slugValid,
          });
        }).catch((err) => {
          reject(err);
        });
      });
    }
  }

  postCategory(params) {
    return new Promise((resolve, reject) => {
      Category.post(params).then((obj) => {
        resolve(obj);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  handleAddCat(event) {
    const id = event.currentTarget.getAttribute('data-id');
    const { categories, categoryLists } = this.state;
    categories[categories.length] = categoryLists[id];
    this.setState({
      categories: categories,
      categoryLists: pull(categoryLists, categoryLists[id]),
    });
  }

  handleRemoveCat(event) {
    const id = event.currentTarget.getAttribute('data-id');
    const { categories, categoryLists } = this.state;
    categoryLists[categoryLists.length] = categories[id];
    this.setState({
      categories: pull(categories, categories[id]),
      categoryLists: categoryLists,
    });
  }

  render() {
    const {
      article,
      loading,
      titleError,
      categories,
      categoryLists,
      catNameError,
      catSlugErrror,
    } = this.state;
    if (loading) return <Loading />;

    return (
      <div>
        <div styleName='container'>
          <div styleName='content'>
            <TextField
              floatingLabelText='title'
              value={article.title}
              onChange={this.handleTitle}
              errorText={titleError}
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
              handleAddCatList={this.handleAddCatList}
              catNameError={catNameError}
              catSlugErrror={catSlugErrror}
            />
          </div>
          <div styleName='content'>
            <EditSide
              article={article}
              categories={categories}
              handleRemoveCat={this.handleRemoveCat}
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
      </div>
    );
  }
}
