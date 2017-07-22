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
      const active = currentNumber === i ? 'disable' : 'active';
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
    let prevClass;
    const prevNumber = currentNumber - 1;
    if (prevNumber > 0) {
      const prevUrl = prevNumber === 1 ? '/' : `/?pages=${prevNumber}`;
      prevLink = <Link to={prevUrl} style={style.link} />;
      prevClass = 'active';
    } else {
      prevLink = false;
      prevClass = 'disable';
    }

    let nextLink;
    let nextClass;
    const nextNumber = currentNumber + 1;
    if (nextNumber <= maxPageNumber) {
      nextLink = <Link to={`/?pages=${nextNumber}`} style={style.link} />;
      nextClass = 'active';
    } else {
      nextLink = false;
      nextClass = 'disable';
    }

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
        <li style={style.pager} className={prevClass}>
          {prevLink}
          prev
        </li>
        {pager}
        <li style={style.pager} className={nextClass}>
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
