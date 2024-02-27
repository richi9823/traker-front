import {
  DELETE_GPS_SUCCESS,
  EDIT_GPS_STATUS_SUCCESS,
  GET_ALL_GPS_SUCCESS,
  GET_GPS_SUCCESS,
  REQUEST_GPS_FAILURE,
  REQUEST_GPS_INIT
} from '../actions/gps';

export default function gps(
  state = {
    isFetching: false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_GPS_INIT:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: null,
      });
    case REQUEST_GPS_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message_error:action.message
      });
    case GET_GPS_SUCCESS:
    case GET_ALL_GPS_SUCCESS:
    case EDIT_GPS_STATUS_SUCCESS:
    case DELETE_GPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
      });
    default:
      return state;
  }
}
