// React
import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router';
import { Provider } from 'react-redux';

import history from '../common/history';
import store from '../common/store/store';

// https://www.npmjs.com/package/redux-simple-router
import { syncReduxAndRouter } from 'redux-simple-router';
syncReduxAndRouter(history, store);

import routes from '../common/routes';
const router = <Router history={history}>
  { routes }
</Router>;

const mount = document.getElementById('voteAppMountPoint');
const provider = <Provider store={store}>
  {router}
</Provider>;

ReactDOM.render(provider, mount);
