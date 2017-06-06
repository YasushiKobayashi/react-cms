import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  browserHistory,
} from 'react-router';

import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore(window.APP_STATE);

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app'),
);
