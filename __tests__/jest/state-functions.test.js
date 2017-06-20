import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';

import {
  App,
  // Top,
  // Article,
  // Edit,
  // Mypage,
} from '../../src/containers';

import configureStore from './store/configureStore';
const store = configureStore();

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(shallow(
      <Provider store={store} >
        <App />
      </Provider>
    ).contains(<div className="foo" />)).toBe(true);
  });
});
