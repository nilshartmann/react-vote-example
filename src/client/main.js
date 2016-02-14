// React
import React from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from '../common/store/store';
import routes from '../common/routes';
import { syncHistoryWithStore } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store);

const mount = document.getElementById('voteAppMountPoint');
const provider = <Provider store={store}>
    <Router history={history}>
        { routes }
    </Router>
</Provider>;

ReactDOM.render(provider, mount);
