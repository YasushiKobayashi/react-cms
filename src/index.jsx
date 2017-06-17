import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import {
  Router,
  browserHistory,
} from 'react-router';

import configureStore from './store/configureStore';
import rootSaga from './sagas';
import routes from './routes';

const store = configureStore(window.APP_STATE);
store.runSaga(rootSaga);

render(
  <Provider store={store} >
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app'),
);
