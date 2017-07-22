/* @flow */
import React, { Component } from 'react';
import { Link } from 'react-router';

import Pager from './pager';
import style from './style';

export default class Paginate extends Component {
  props: {
    containerClass: string;
    childClass: string;
    pageCount: number;
    perPage: number;
    current: number;
  };

  render() {
    const {
      containerClass,
      childClass,
      current,
      pageCount,
      perPage,
    } = this.props;
    const pager = [];
    const pageNumber = Math.ceil(pageCount / perPage);

    let i;
    for (i = 1; i <= pageNumber; i += 1) {
      const active = current === i ? 'current' : 'active';
      pager.push(
        <Pager
          key={i}
          pages={i}
          active={active}
          childClass={childClass}
        />,
      );
    }

    const first = '/';
    const last = `/?pages=${pageNumber}`;

    return (
      <ul className={containerClass}>
        <li style={style.pager}>
          Page {current} / {pageNumber}
        </li>
        <li style={style.pager}>
          <Link to={first} style={style.link} />
          first
        </li>
        <li style={style.pager}>
          prev
        </li>
        {pager}
        <li style={style.pager}>
          next
        </li>
        <li style={style.pager}>
          <Link to={last} style={style.link} />
          last
        </li>
      </ul>
    );
  }
}
