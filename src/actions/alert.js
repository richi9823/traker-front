import { TrakerApi } from "../constants/apiConf";
import { logoutUser } from "./auth";

export const REQUEST_ALERT_INIT = 'REQUEST_ALERT_INIT';
export const CREATE_ALERT_SUCCESS = 'CREATE_ALERT_SUCCESS';
export const DELETE_ALERT_SUCCESS = 'DELETE_ALERT_SUCCESS';
export const EDIT_ALERT_SUCCESS = 'EDIT_ALERT_SUCCESS';
export const GET_ALERT_SUCCESS = 'GET_ALERT_SUCCESS';
export const GET_ALL_ALERTS_SUCCESS = 'GET_ALL_ALERTS_SUCCESS';
export const REQUEST_ALERTS_FAILURE = 'REQUEST_ALERTS_FAILURE';
export const EDIT_RECORD_ALERT = 'EDIT_RECORD_ALERT'

const AlertApi = new TrakerApi.AlertControllerApi();

function requestAlertInit() {
  return {
    type: REQUEST_ALERT_INIT,
    isFetching: true,
  };
}

function requestCreateAlert(alert) {
  return {
    type: CREATE_ALERT_SUCCESS,
    isFetching: false,
    message:"Alerta registrada",
    alert
  };
}

function requestGetAlert(alert) {
  return {
    type: GET_ALERT_SUCCESS,
    isFetching: false,
    alert
  };
}

function requestDeleteAlert() {
  return {
    type: DELETE_ALERT_SUCCESS,
    isFetching: false,
  };
}

function requestEditAlert(alert) {
  return {
    type: EDIT_ALERT_SUCCESS,
    isFetching: false,
    message:"Edicion completa",
    alert
  };
}

function editRecordAlertAction(name, newValue) {
  return {
    type: EDIT_RECORD_ALERT,
    name,
    newValue
  };
}


function requestGetAllAlerts(alertList) {
  return {
    type: GET_ALL_ALERTS_SUCCESS,
    isFetching: false,
    alertList,
  };
}

function requestAlertFailure(message) {
  return {
    type: REQUEST_ALERTS_FAILURE,
    isFetching: false,
    errorMessage: message,
  };
}

export function editRecordAlert(name, newValue) {
  return dispatch => {
    dispatch(editRecordAlertAction(name,newValue))
  };
}

export function getAlert(id) {

  return dispatch => {

    dispatch(requestAlertInit());
    return AlertApi.getAlert(id)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetAlert(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestAlertFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}

export function createAlert(alert) {

  return dispatch => {

    dispatch(requestAlertInit());
    return AlertApi.createAlert(alert)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestCreateAlert(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestAlertFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });

  };
}

export function editAlert(id, alert) {

  return dispatch => {

    dispatch(requestAlertInit());
    return AlertApi.editAlert(id, alert)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestEditAlert(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestAlertFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });

  };
}

export function getAllAlerts(vehicleId, page, size, sort) {

  return dispatch => {

    dispatch(requestAlertInit());
    return AlertApi.getAlerts({
      vehicleId,
      page,
      size ,
      sort
    })
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetAllAlerts(response));
        return Promise.resolve(response.total);
      })
      .catch(err => {
        console.log(err)
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestAlertFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });

  };
}

export function removeAlert(id) {

  return dispatch => {

    dispatch(requestAlertInit());
    return AlertApi.removeAlert(id)
      .then(() => {
        // Dispatch the success action
        dispatch(requestDeleteAlert());
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestAlertFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });

  };
}