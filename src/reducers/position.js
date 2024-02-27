import {
  GET_POSITION_SUCCESS
} from '../actions/position';

export default function position(
  state = {
    isFetching: false,
  },
  action,
) {
  switch (action.type) {
    case GET_POSITION_SUCCESS:
      return Object.assign({}, state, {
      });
    default:
      return state;
  }
}
