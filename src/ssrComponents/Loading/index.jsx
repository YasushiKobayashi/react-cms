/* @flow */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { hamlet } from '../../utils';
import config from '../../config';

export default class Loading extends Component {
  props: {
    title: string;
  }

  render() {
    const { title } = this.props;
    return (
      <div >
        <Helmet
          titleTemplate={`%s | ${config.siteTitle}`}
          title={title}
          meta={hamlet.meta(title)}
        />
      </div>
    );
  }
}
