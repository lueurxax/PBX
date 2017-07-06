/**
 * Created by xax on 29.06.2017.
 */
/**
 * Created by xax on 28.06.2017.
 */
/**
 * Created by xax on 04.03.2017.
 */
import { FETCH_QUEUES } from '../actions/types';

export default function(state = { list: [] }, action) {
  switch (action.type) {
    case FETCH_QUEUES:
      return { ...state, list: action.payload };
  }
  return state;
}
