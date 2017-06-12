import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import {
  Router,
  browserHistory,
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import rootSaga from './sagas';
import routes from './routes';

const store = configureStore(browserHistory, window.APP_STATE);
store.runSaga(rootSaga);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store} >
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('app'),
);
