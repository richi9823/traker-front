import {
  GET_POSITION_SUCCESS
} from '../actions/position';

export default function position(
  state = {
    isFetching: false,
    message: null,
    errorMessage: null,
    position:{
      latitude:0,
      longitude:0
    },
  },
  action,
) {
  switch (action.type) {
    case GET_POSITION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
        position: action.position,
      });
    default:
      return state;
  }
}
