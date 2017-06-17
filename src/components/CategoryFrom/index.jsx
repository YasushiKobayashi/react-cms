/* @flow */
import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';

import type { CategoryType } from '../../types/CategoryType';
import type { ValidType } from '../../types/ValidType';


import style from '../../style';
import './index.scss';

export default class CategoryFrom extends Component {
  props: {
    categoryNew: CategoryType,
    valid: ValidType,
    editCatName: Function,
    editCatSlug: Function,
    createCategory: Function,
  };
  handleCatName: Function;
  handleCatSlug: Function;

  constructor() {
    super();
    this.handleCatName = this.handleCatName.bind(this);
    this.handleCatSlug = this.handleCatSlug.bind(this);
  }

  handleCatName(e: any) {
    this.props.editCatName(e.target.value);
  }

  handleCatSlug(e: any) {
    this.props.editCatSlug(e.target.value);
  }

  render() {
    const { categoryNew, valid, createCategory } = this.props;

    return (
      <div>
        <div styleName='container'>
          <TextField
            floatingLabelText='category'
            style={style.catagoryForm}
            value={categoryNew.name}
            onChange={this.handleCatName}
            errorText={valid.catNameError}
          />
          <TextField
            floatingLabelText='slug'
            style={style.catagoryForm}
            value={categoryNew.slug}
            onChange={this.handleCatSlug}
            errorText={valid.catSlugErrror}
          />
        </div>
        <RaisedButton
          label='ADD'
          onClick={createCategory}
          style={style.catagoryBtn}
          primary
        />
      </div>
    );
  }
}
