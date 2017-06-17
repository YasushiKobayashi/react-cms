/* @flow */
import React, { Component } from 'react';
import Highlight from 'react-highlight';
import { TextField } from 'material-ui';
import moment from 'moment';

import type { ArticleType } from '../../types/ArticleType';
import type { CategoryType } from '../../types/CategoryType';

import { Categories } from '../../parts';
import style from '../../style';
import './EditSide.scss';

export default class EditSide extends Component {
  props: {
    handleCat: Function,
    article: ArticleType,
    categories: Array<CategoryType>,
  };

  render() {
    const {
      article,
      categories,
      handleCat,
    } = this.props;

    const created = moment(article.created).format('YYYY/MM/DD');
    const updated = moment(article.updated).format('YYYY/MM/DD');
    return (
      <div styleName='container'>
        <TextField
          floatingLabelText='title'
          value={article.title}
          style={style.titleField}
          disabled
        />
        <h3 styleName='contentHead'>content</h3>
        <div styleName='content' id='content'>
          <Highlight innerHTML>
            {article.htmlContent}
          </Highlight>
        </div>
        <h3>category</h3>
        <div styleName='wrapper'>
          <Categories
            categories={categories}
            handleCat={handleCat}
            type='selected'
          />
        </div>
        <h3>date</h3>
        <p>
          created：{created}
          <br />
          updated：{updated}
        </p>
      </div>
    );
  }
}
