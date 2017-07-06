/**
 * Created by xax on 04.03.2017.
 */
import { FETCH_USERS, DELETE_USER, ADD_USER } from '../actions/types';

export default function(state = { list: [] }, action) {
  let list = {};
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, list: action.payload };
    case DELETE_USER:
      Object.keys(state.list).map(user => {
        if (user !== action.payload) {
          list[user] = state.list[user];
        }
      });
      return { ...state, list };
    case ADD_USER:
      list = Object.assign(state.list, action.payload);
      return { ...state, list: list };
  }
  return state;
}
