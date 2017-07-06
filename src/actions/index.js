import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_USERS,
  DELETE_USER,
  ADD_USER,
  FETCH_EXTS,
  FETCH_QUEUES,
  ADD_EXT,
  DELETE_EXT,
  UPDATE_AGENTS
} from './types';

const ROOT_URL = 'http://call.dssl/api';

export function signinUser({ user, password, code }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/login`, { user, password, code })
      .then(response => {
        // Update state to indicate that user was sign in
        dispatch({ type: AUTH_USER });
        // save JWT token
        localStorage.setItem('token', response.data.token);
        // redirect to
        browserHistory.push('/');
      })
      .catch((err) => {
        console.log();
        dispatch(authError(err.response.data.error));
      });
  };
}

export function signupUser({ user, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { user, password }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        // Update state to indicate that user was sign in
        dispatch({ type: AUTH_USER });
        dispatch({
          type: ADD_USER,
          payload: response.data.user
        });
      })
      .catch((error) => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      })
      .catch(err => {
        if(err.response.status === 401) {
          browserHistory.push('/signout');
        }
      });
  };
}
export function fetchUsers() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/users`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_USERS,
          payload: response.data
        });
      })
      .catch(err => {
        if(err.response.status === 401) {
          browserHistory.push('/signout');
        }
      });
  };
}
export function fetchExts() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/exts`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_EXTS,
          payload: response.data
        });
      })
      .catch(err => {
        if(err.response.status === 401) {
          browserHistory.push('/signout');
        } else {
          dispatch(authError(err.response.data.error));
        }
      });
  };
}
export function fetchQueues() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/queues`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_QUEUES,
          payload: response.data
        });
      })
      .catch(err => {
        console.log(err.response);
        if(err.response.status === 401) {
          browserHistory.push('/signout');
        } else {
          dispatch(authError(err.response.data.error));
        }
      });
  };
}
export function deleteUser(id) {
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/users`, {
      headers: { authorization: localStorage.getItem('token') },
      data: { id }
    })
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: DELETE_USER,
            payload: id
          });
        } else {
          console.log('User already deleted');
        }
      })
      .catch();
  };
}
export function deleteExt(id, i) {
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/exts`, {
      headers: { authorization: localStorage.getItem('token') },
      data: { id }
    })
      .then(response => {
        if (!response.data || !response.data.err) {
          dispatch({
            type: DELETE_EXT,
            payload: i
          });
        } else {
          console.log('User already deleted', response);
        }
      })
      .catch(err => {
        console.error(err);
        if(err.response && err.response.status === 401) {
          browserHistory.push('/signout');
        } else {
          dispatch(authError(err.response.data.error));
        }
      });
  };
}
export function addExt(values) {
  return function(dispatch) {
    axios.patch(`${ROOT_URL}/exts`, values, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        if (response.data && !response.data.err) {
          dispatch({
            type: ADD_EXT,
            payload: response.data[0]
          });
        }
      })
      .catch(err => {
        console.log(err);
        if(err.response && err.response.status === 401) {
          browserHistory.push('/signout');
        } else {
          dispatch(authError(err.response.data.error));
        }
      });
  };
}

export function addQueue(values) {
  console.log(values);
}
export function updateAgents(agents, queue) {
  return function(dispatch) {
    axios.patch(`${ROOT_URL}/queues/members`, { agents, queue }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log(response);
        if (response.data && !response.data.err) {
          dispatch({
            type: UPDATE_AGENTS,
            payload: response
          });
        }
      })
      .catch(err => {
        console.log(err);
        if(err.response && err.response.status === 401) {
          browserHistory.push('/signout');
        } else {
          dispatch(authError(err.response.data.error));
        }
      });
  };
}
