import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import usersReducer from './users_reducer';
import extsReducer from './exts_reducer';
import queuesReducer from './queues_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  users: usersReducer,
  exts: extsReducer,
  queues: queuesReducer
});

export default rootReducer;
