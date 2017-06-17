/* @flow */
import React, { Component } from 'react';
import { Chip } from 'material-ui';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import Delete from 'material-ui/svg-icons/action/delete';

import type { CategoryType } from '../../types/CategoryType';

import style from '../../style';

export default class Categories extends Component {
  props: {
    categories: Array<CategoryType>;
    type: string;
    handleCat: Function;
  };

  render() {
    const {
      categories,
      type,
      handleCat,
    } = this.props;

    const icon = (type === 'selected') ? <Delete style={style.icon} /> : <CheckCircle style={style.icon} />;

    const cat = categories.map((category, number) => {
      return (
        <Chip
          key={category.id}
          onClick={handleCat}
          data-id={number}
          style={style.chip}
          labelStyle={style.chipLabel}
        >
          {icon}
          {category.name}
        </Chip>
      );
    });

    return (
      <div>
        {cat}
      </div>
    );
  }
}
