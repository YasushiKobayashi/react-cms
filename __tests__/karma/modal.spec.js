import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import {
  Modal,
} from '../../src/parts';

const message = 'hogehogeohoe';

function setup() {
  const props = {
    message: message,
    isModalOpen: true,
    // handleModal: function(),
  };

  return props;
}

describe('Modal', () => {
  it('モーダルに渡したテキストが表示されているか', () => {
    const props = setup();
    const wrapper = shallow(<Modal {...props} />);
    expect(
      wrapper.contains(message)
    ).to.equal(true);
  });
});
