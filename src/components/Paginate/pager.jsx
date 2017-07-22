/* @flow */
import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './style';

export default class Pager extends Component {
  props: {
    childClass: string;
    active: string;
    pages: number;
  }

  render() {
    const {
      pages,
      active,
      childClass,
    } = this.props;

    const href = `/?pages=${pages}`;

    const link = active === 'active' ?
      <Link to={href} style={style.link} /> : false;

    return (
      <li className={childClass} style={style.pager}>
        {link}
        {pages}
      </li>
    );
  }
}
