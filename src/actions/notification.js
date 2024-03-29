import { TrakerApi } from "../constants/apiConf";
import { logoutUser } from "./auth";

export const REQUEST_NOTIFICATION_INIT = 'REQUEST_NOTIFICATION_INIT';
export const REQUEST_NOTIFICATION_FAILURE = 'REQUEST_NOTIFICATION_FAILURE';

export const GET_NOTIFICATION_SUCCESS = 'GET_NOTIFICATION_SUCCESS';
export const READ_NOTIFICATION = 'READ_NOTIFICATION';
export const GET_ALL_NOTIFICATIONS_SUCCESS = 'GET_ALL_NOTIFICATIONS_SUCCESS';


const NotificationApi = new TrakerApi.NotificationControllerApi();

function requestNotificationInit() {
  return {
    type: REQUEST_NOTIFICATION_INIT,
    isFetching: true,
  };
}

function requestGetNotification(notification) {
  return {
    type: GET_NOTIFICATION_SUCCESS,
    isFetching: false,
    notification,
  };
}

function requestGetAllNotifications(notificationList) {
  return {
    type: GET_ALL_NOTIFICATIONS_SUCCESS,
    isFetching: false,
    notificationList,
  };
}

function requestReadNotificaiton(notification) {
  return {
    type: READ_NOTIFICATION,
    isFetching: false,
    notification
  };
}


function requestNotificationFailure(message) {
  return {
    type: REQUEST_NOTIFICATION_FAILURE,
    isFetching: false,
    errorMessage: message,
  };
}


export function getNotification(notificationId) {

  return dispatch => {

    dispatch(requestNotificationInit());
    return NotificationApi.getNotification(notificationId)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetNotification(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestNotificationFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}

export function getAllNotifications(vehicleId, alertId, readed, page, size, sort) {

  return dispatch => {

    dispatch(requestNotificationInit());
    var opts = {
      vehicleId,
      alertId,
      readed,
      page,
      size,
      sort,
    }
    return NotificationApi.getNotifications(opts)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetAllNotifications(response));
        return Promise.resolve(response.total);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestNotificationFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}

export function readNotification(notificationId) {

  return dispatch => {

    dispatch(requestNotificationInit());
    return NotificationApi.readNotification(notificationId)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestReadNotificaiton(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestNotificationFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}