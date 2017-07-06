/**
 * Created by xax on 28.06.2017.
 */
/**
 * Created by xax on 04.03.2017.
 */
import { FETCH_EXTS, ADD_EXT, DELETE_EXT } from '../actions/types';

export default function(state = { list: [], new: false, status: false }, action) {
  let list = [];
  switch (action.type) {
    case FETCH_EXTS:
      return { ...state, list: action.payload };
    case ADD_EXT:
      list = state.list;
      let replace;
      list.forEach((ext, index) => {
        if(ext.name === action.payload.name) {
          replace = index;
        }
      });
      if(replace) {
        Object.keys(list[replace]).forEach(key => {
          if(action.payload[key]) {
            list[replace][key] = action.payload[key];
          }
        });
      } else {
        list.unshift(action.payload);
      }
      return { ...state, list, new: action.payload.id, status: false };
    case DELETE_EXT:
      list = state.list;
      delete list[action.payload];
      return { ...state, list, status: 'success', new: false };
  }
  return state;
}
