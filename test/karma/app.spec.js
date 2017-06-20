import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { expect } from 'chai';

// import App from '../../src/containers/App/index.jsx';

import {
  App,
  // Top,
  // Article,
  // Edit,
  // Mypage,
} from '../../src/containers';

describe('ListView', () => {
  it("contains spec with an expectation", () => {
    expect(shallow(<App />).contains(<div />)).toBe(true);
  });
});
