import React from 'react';
import { mount } from 'enzyme';

import {
  App,
  // Top,
  // Article,
  // Edit,
  // Mypage,
} from '../../src/containers';


describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    const wrapper = mount(
      <App />
    );
  });
});
