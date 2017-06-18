import React, { Component } from 'react';
import MDSpinner from 'react-md-spinner';

export default class Loading extends Component {
  render() {
    return (
      <div>
        <MDSpinner />
      </div>
    );
  }
}
