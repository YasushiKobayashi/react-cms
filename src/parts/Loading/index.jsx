/* @flow */
import React, { Component } from 'react';
import { CircularProgress } from 'material-ui';

export default class Loading extends Component {
  render() {
    return (
      <CircularProgress
        style={{
          display: 'block',
          margin: '50px auto',
        }}
      />
    );
  }
}
