import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';


import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Feature from './components/feature';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import Users from './components/users';
import Exts from './containers/exts';
import Queues from './containers/queues';
import RequireAuth from './components/auth/require_auth';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to signed in
if (token) {
  // we need update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={RequireAuth(Feature)}/>
        <Route path="signin" component={Signin}/>
        <Route path="signout" component={Signout}/>
        <Route path="users" component={RequireAuth(Users)}/>
        <Route path="exts" component={RequireAuth(Exts)}/>
        <Route path="queues" component={RequireAuth(Queues)}/>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
