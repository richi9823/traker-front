import {
  GET_ALL_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATION_SUCCESS,
  READ_NOTIFICATION,
  REQUEST_NOTIFICATION_FAILURE,
  REQUEST_NOTIFICATION_INIT
} from '../actions/notification';

export default function notification(
  state = {
    isFetching: false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_NOTIFICATION_INIT:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: null,
      });
    case REQUEST_NOTIFICATION_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message_error:action.message
      });
    case READ_NOTIFICATION:
    case GET_NOTIFICATION_SUCCESS:
    case GET_ALL_NOTIFICATIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
      });
    default:
      return state;
  }
}
