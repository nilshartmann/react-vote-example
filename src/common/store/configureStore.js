import { compose, createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';

import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(initialState) {
  const reduxRouterMiddleware = routerMiddleware(browserHistory);
  const store = compose(
    applyMiddleware(
      thunk,
      reduxRouterMiddleware)
  )(createStore)(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
