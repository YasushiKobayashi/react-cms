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
    const maxPageNumber = Math.ceil(pageCount / perPage);
    const currentNumber = parseInt(current, 10);

    let i;
    for (i = 1; i <= maxPageNumber; i += 1) {
      const active = currentNumber === i ? 'current' : 'active';
      const pagerClass = `${active} ${childClass}`;
      pager.push(
        <Pager
          key={i}
          pages={i}
          active={active}
          childClass={pagerClass}
        />,
      );
    }

    let prevLink;
    const prevNumber = currentNumber - 1;
    if (prevNumber > 0) {
      const prevUrl = prevNumber === 1 ? '/' : `/?pages=${prevNumber}`;
      prevLink = <Link to={prevUrl} style={style.link} />;
    } else {
      prevLink = false;
    }

    const nextNumber = currentNumber + 1;
    const nextLink = nextNumber <= maxPageNumber ?
      <Link to={`/pages=${nextNumber}`} style={style.link} /> :
      false;

    const first = '/';
    const last = `/?pages=${maxPageNumber}`;

    return (
      <ul className={containerClass}>
        <li style={style.pager}>
          Page {current} / {maxPageNumber}
        </li>
        <li style={style.pager}>
          <Link to={first} style={style.link} />
          first
        </li>
        <li style={style.pager}>
          {prevLink}
          prev
        </li>
        {pager}
        <li style={style.pager}>
          {nextLink}
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
