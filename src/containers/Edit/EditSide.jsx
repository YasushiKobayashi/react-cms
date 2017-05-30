import React, { Component, PropTypes } from 'react';
import Highlight from 'react-highlight';
import { TextField } from 'material-ui';
import moment from 'moment';

import { Categories } from '../../parts';
import style from '../../style';
import './EditSide.scss';

export default class EditSide extends Component {
  static propTypes = {
    handleRemoveCat: PropTypes.func.isRequired,
    article: PropTypes.shape({
      content: PropTypes.string.isRequired,
      htmlContent: PropTypes.string.isRequired,
      created: PropTypes.object.isRequired,
      updated: PropTypes.object.isRequired,
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })).isRequired,
  }

  render() {
    const {
      article,
      categories,
      handleRemoveCat,
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
            handleCat={handleRemoveCat}
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
