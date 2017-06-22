import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import {
  ContentList,
} from '../../src/components';

function setup() {
  const props = {
    archives: [
      {
        id: 1,
        title: 'hoge',
        commentsCount: 0,
        created: new Date(),
        updated: new Date(),
        wpFlg: false,
        user: {
          name: 'hoge',
        },
      },
      {
        id: 2,
        title: 'hoge',
        commentsCount: 0,
        created: new Date(),
        updated: new Date(),
        wpFlg: true,
        user: {
          name: 'hoge',
        },
      },
    ],
  };

  return props;
}

describe('ListView', () => {
  it('props通りのループをしているか', () => {
    const props = setup();
    const wrapper = shallow(<ContentList {...props} />);
    expect(wrapper.find('dl').at(0).key()).to.equal('1');
    expect(wrapper.find('dl').at(1).key()).to.equal('2');
  });
});
