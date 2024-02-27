import {
  DELETE_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  GET_USER_SUCCESS,
  REQUEST_USER_FAILURE,
  REQUEST_USER_INIT
} from '../actions/user';

export default function userDetails(
  state = {
    isFetching: false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_USER_INIT:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: null,
      });
    case REQUEST_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message_error:action.message
      });
    case GET_USER_SUCCESS:
    case EDIT_USER_SUCCESS:
    case DELETE_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
      });
    default:
      return state;
  }
}
