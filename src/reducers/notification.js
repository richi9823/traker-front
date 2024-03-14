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
    message: null,
    errorMessage: null,
    notification:{},
    notificationList:{items:[], total: 0},
  },
  action,
) {
  switch (action.type) {
    case REQUEST_NOTIFICATION_INIT:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: null,
        errorMessage: null,
      });
    case REQUEST_NOTIFICATION_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        errorMessage:action.errorMessage
      });
    case READ_NOTIFICATION:
    case GET_NOTIFICATION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
        notification: action.notification,
      });
    case GET_ALL_NOTIFICATIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
        notificationList: action.notification,
      });
    default:
      return state;
  }
}
