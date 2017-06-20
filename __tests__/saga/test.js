import { expect } from 'chai';
import rootSaga from '../../src/sagas/';

describe('rootSaga', () => {
  it('launches handleRequestUser task', () => {
    const saga = rootSaga();

    ret = saga.next();
    assert.deepEqual(ret.value, fork(user.isLogin));

    ret = saga.next();
    assert(ret.done);
  });
});
