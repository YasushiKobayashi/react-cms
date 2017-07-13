/* @flow */
import React, { Component } from 'react';

export default class Pager extends Component {
  props: {
    childClass: string;
    pages: number;
  }

  render() {
    const {
      pages,
      childClass,
    } = this.props;

    return (
      <li className={childClass}>
        { pages }
      </li>
    );
  }
}
