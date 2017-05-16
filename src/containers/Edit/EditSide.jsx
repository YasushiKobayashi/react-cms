import React, { Component, PropTypes } from 'react';
import Highlight from 'react-highlight';
import { TextField } from 'material-ui';

import { Categories } from '../../parts';
import style from '../../style';
import './EditSide.scss';

export default class EditSide extends Component {
  static propTypes = {
    handleRemoveCat: PropTypes.func.isRequired,
    article: PropTypes.shape({
      title: PropTypes.string,
      htmlContent: PropTypes.string,
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })).isRequired,
  }
  static defaultProps = {
    article: {
      title: '',
      htmlContent: '',
    },
  }

  render() {
    const {
      article,
      categories,
      handleRemoveCat,
    } = this.props;

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
      </div>
    );
  }
}
