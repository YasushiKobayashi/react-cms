import React from 'react';
import { Route } from 'react-router';

import {
  App,
  Top,
  Article,
  Edit,
  Mypage,
} from './containers';

module.exports = (
  <Route component={App}>
    <Route path='/' component={Top} />
    <Route path='/mypage' component={Mypage} />
    <Route path='/edit' component={Edit}>
      <Route path='/edit/:id' />
    </Route>
    <Route path='/article/:id' component={Article} />
  </Route>
);
