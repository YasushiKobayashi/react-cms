/* @flow */
import React, { Component } from 'react';
import { Link } from 'react-router';

import Pager from './pager';
import style from './style';

export default class Paginate extends Component {
  props: {
    containerClass: string;
    childClass: string;
    firstUrl: string;
    pagerUrl: string;
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
      firstUrl,
      pagerUrl,
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
          firstUrl={firstUrl}
          pagerUrl={pagerUrl}
        />,
      );
    }

    let prevLink;
    let prevClass;
    const prevNumber = currentNumber - 1;
    if (prevNumber > 0) {
      const prevUrl = prevNumber === 1 ? firstUrl : `${pagerUrl}${prevNumber}`;
      prevLink = <Link to={prevUrl} style={style.link} />;
      prevClass = 'active';
    } else {
      prevLink = false;
      prevClass = 'disable';
    }

    let firstClass;
    let firstLink;
    if (currentNumber === 1) {
      firstClass = 'disable';
      firstLink = false;
    } else {
      firstClass = 'active';
      firstLink = <Link to={firstUrl} style={style.link} />;
    }

    let nextLink;
    let nextClass;
    const nextNumber = currentNumber + 1;
    if (nextNumber <= maxPageNumber) {
      const nextUrl = `${pagerUrl}${nextNumber}`;
      nextLink = <Link to={nextUrl} style={style.link} />;
      nextClass = 'active';
    } else {
      nextLink = false;
      nextClass = 'disable';
    }

    const last = `${pagerUrl}${maxPageNumber}`;
    let lastClass;
    let lastLink;
    if (currentNumber === maxPageNumber) {
      lastClass = 'disable';
      lastLink = false;
    } else {
      lastClass = 'active';
      lastLink = <Link to={last} style={style.link} />;
    }

    return (
      <ul className={containerClass}>
        <li style={style.pager}>
          Page {current} / {maxPageNumber}
        </li>
        <li style={style.pager} className={firstClass}>
          {firstLink}
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
        <li style={style.pager} className={lastClass}>
          {lastLink}
          last
        </li>
      </ul>
    );
  }
}
