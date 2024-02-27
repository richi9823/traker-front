import {
  CREATE_ALERT_SUCCESS,
  DELETE_ALERT_SUCCESS,
  EDIT_ALERT_SUCCESS,
  GET_ALERT_SUCCESS,
  GET_ALL_ALERTS_SUCCESS,
  REQUEST_ALERTS_FAILURE,
  REQUEST_ALERT_INIT
} from '../actions/alert';

export default function alert(
  state = {
    isFetching: false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_ALERT_INIT:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: null,
      });
    case REQUEST_ALERTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message_error:action.message
      });
    case CREATE_ALERT_SUCCESS:
    case DELETE_ALERT_SUCCESS:
    case EDIT_ALERT_SUCCESS:
    case GET_ALERT_SUCCESS:
    case GET_ALL_ALERTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
      });
    default:
      return state;
  }
}
