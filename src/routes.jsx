import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  Top,
  Article,
  Edit,
  Mypage,
} from './containers';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Top} />
    <Route path='category/:slug' component={Top} />
    <Route path='mypage' component={Mypage} />
    <Route path='edit' component={Edit}>
      <Route path=':id' />
    </Route>
    <Route path='article/:id' component={Article} />
  </Route>
);
