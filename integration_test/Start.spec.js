import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import expect, {spyOn} from 'expect';
import TestUtils from 'react-addons-test-utils';
import createHistory from 'history/lib/createBrowserHistory';
import { syncReduxAndRouter } from 'redux-simple-router';

import * as Actions from '../src/common/actions';
import configureStore from '../src/common/store/configureStore';
import routes from '../src/common/routes';

import votes from '../test/fixtures/convertedVotes';

function createResponse(jsonResponse, status = 200, contentType = 'application/json') {
  const response = new Response(JSON.stringify(jsonResponse), {
    status:  status,
    headers: {
      'Content-type': contentType
    }
  });

  return Promise.resolve(response);
}

describe('Application', () => {

  let fetchSpy;
  beforeEach(() => {
    fetchSpy = spyOn(window, 'fetch');
  });

  afterEach(() => {
    fetchSpy.restore();
  });

  it('navigates to votes and loads data on startup', () => {
  const store = configureStore();
  const history = createHistory();
  syncReduxAndRouter(history, store);

  TestUtils.renderIntoDocument(
    <Provider store={store}>
      <Router history={history}>
        { routes }
      </Router>
    </Provider>);

//    fetchSpy.andReturn(Promise.resolve(new Response(JSON.stringify(votes))));
    fetchSpy.andReturn(createResponse(votes));

    store.dispatch(Actions.routeToMain());
    expect(store.getState().routing.path).toEqual('/votes');
    expect(fetchSpy.calls.length).toBe(1);
    expect(fetchSpy.calls[0].arguments.length).toBe(1);
    expect(fetchSpy.calls[0].arguments[0]).toMatch(/api\/votes$/);

  });

});
