/* @flow */
import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './style';

export default class Pager extends Component {
  props: {
    childClass: string;
    active: string;
    firstUrl: string;
    pagerUrl: string;
    pages: number;
  }

  render() {
    const {
      pages,
      active,
      childClass,
      firstUrl,
      pagerUrl,
    } = this.props;

    const href = (pages === 1) ? firstUrl : `${pagerUrl}${pages}`;

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
