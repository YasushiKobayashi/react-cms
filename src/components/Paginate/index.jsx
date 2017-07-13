/* @flow */
import React, { Component } from 'react';
import { Link } from 'react-router';

import Pager from './pager';

export default class Paginate extends Component {
  props: {
    containerClass: string;
    childClass: string;
    pageNumber: number;
    current: number;
  };

  render() {
    const {
      containerClass,
      childClass,
      pageNumber,
      current,
    } = this.props;
    const pager = [];

    let i;
    for (i = 1; i <= pageNumber; i += 1) {
      const active = current === pageNumber ? 'current' : 'active';
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
        <li>
          <Link to={first}>
            first
          </Link>
        </li>
        <li>
          prev
        </li>
        {pager}
        <li>
          next
        </li>
        <li>
          <Link to={last}>
            last
          </Link>
        </li>
      </ul>
    );
  }
}
