import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton } from 'material-ui';
import toMarkdown from 'to-markdown';
import _ from 'lodash';

import EditArticle from './EditArticle';
import EditSide from './EditSide';
import { CommentList } from '../../components';
import { Loading, Categories, CategoryFrom } from '../../parts';
import { Archive, Category } from '../../actions';
import { request, validation, convertMdtoHtml } from '../../utils';
import style from '../../style';
import './index.scss';

const tabMark = 'markdown';
const tabHtml = 'html';

export default class Edit extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
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
        created: new Date(),
        updated: new Date(),
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
      Category.get().then((obj) => {
        this.setState({
          categoryLists: obj,
          loading: false,
        });
        return obj;
      }).then((categoryLists) => {
        if (typeof this.props.params.id !== 'undefined') {
          Archive.getSigleArticle(this.props.params.id).then((obj) => {
            const categoryIds = _.map(obj.categories, 'id');
            _.forEach(categoryIds, (value) => {
              categoryLists = _.reject(categoryLists, { id: value });
            });
            this.setState({
              article: obj,
              categories: obj.categories,
              categoryLists: categoryLists,
            });
          }).catch((err) => {
            reject(err);
          });
        }
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
    let newContent, htmlContent;
    if (type === 'markdown') {
      newContent = content;
      htmlContent = convertMdtoHtml(content);
    } else {
      newContent = toMarkdown(content);
      htmlContent = content;
    }
    this.manegeContent(newContent, htmlContent, selectionStart);
  }

  handleContentUrl(val) {
    console.log(val);
    const valArr = val.split(/\s+/);
    const str = valArr.join('');
    console.log(str);
    return val;
  }

  handleUploadImage(file, type) {
    const { article, selectionStart } = this.state;
    return new Promise((resolve, reject) => {
      this.uploadImage(file).then((imagePath) => {
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

  uploadImage(file) {
    return new Promise((resolve, reject) => {
      request.UPLOAD('post/upload', file).then((obj) => {
        resolve(obj.path);
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
    const { article, categories } = this.state;
    const categoryIds = _.map(categories, 'id');
    _.forEach(categoryIds, (value) => {
      _.filter(categoryIds, { id: value });
    });
    const params = {
      user_id: this.props.user.id,
      title: article.title,
      content: article.content,
      wp_flg: wpFlg,
      categories: categories,
    };

    new Promise((resolve, reject) => {
      this.saveArticle(params).then((obj) => {
        browserHistory.push(`/article/${obj.id}`);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  saveArticle(params) {
    const id = this.props.params.id;
    if (typeof id === 'undefined') {
      return new Promise((resolve, reject) => {
        Archive.postArticle(params).then((obj) => {
          resolve(obj);
        }).catch((err) => {
          reject(err);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        Archive.putArticle(id, params).then((obj) => {
          resolve(obj);
        }).catch((err) => {
          reject(err);
        });
      });
    }
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

  handleAddCat(e) {
    const id = e.currentTarget.getAttribute('data-id');
    const { categories, categoryLists } = this.state;
    categories[categories.length] = categoryLists[id];
    this.setState({
      categories: categories,
      categoryLists: _.pull(categoryLists, categoryLists[id]),
    });
  }

  handleRemoveCat(e) {
    const id = e.currentTarget.getAttribute('data-id');
    const { categories, categoryLists } = this.state;
    categoryLists[categoryLists.length] = categories[id];
    this.setState({
      categories: _.pull(categories, categories[id]),
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
        <CommentList comments={article.comments} />
      </div>
    );
  }
}
