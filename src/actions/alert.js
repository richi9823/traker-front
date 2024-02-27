import { TrakerApi } from "../constants/apiConf";
import { logoutUser } from "./auth";

export const REQUEST_ALERT_INIT = 'REQUEST_ALERT_INIT';
export const CREATE_ALERT_SUCCESS = 'CREATE_ALERT_SUCCESS';
export const DELETE_ALERT_SUCCESS = 'DELETE_ALERT_SUCCESS';
export const EDIT_ALERT_SUCCESS = 'EDIT_ALERT_SUCCESS';
export const GET_ALERT_SUCCESS = 'GET_ALERT_SUCCESS';
export const GET_ALL_ALERTS_SUCCESS = 'GET_ALL_ALERTS_SUCCESS';
export const REQUEST_ALERTS_FAILURE = 'REQUEST_ALERTS_FAILURE';

const AlertApi = new TrakerApi.AlertControllerApi();

function requestAlertInit() {
  return {
    type: REQUEST_ALERT_INIT,
    isFetching: true,
  };
}

function requestCreateAlert() {
  return {
    type: CREATE_ALERT_SUCCESS,
    isFetching: false,
    message:"Alerta registrada"
  };
}

function requestGetAlert(data) {
  return {
    type: GET_ALERT_SUCCESS,
    isFetching: false,
  };
}

function requestDeleteAlert() {
  return {
    type: DELETE_ALERT_SUCCESS,
    isFetching: false,
  };
}

function requestEditAlert() {
  return {
    type: EDIT_ALERT_SUCCESS,
    isFetching: false,
    message:"Edicion completa"
  };
}

function requestGetAllAlerts() {
  return {
    type: GET_ALL_ALERTS_SUCCESS,
    isFetching: false,
  };
}

function requestAlertFailure() {
  return {
    type: REQUEST_ALERTS_FAILURE,
    isFetching: false,
  };
}

export function getAlert(id) {

  return dispatch => {

    dispatch(requestAlertInit());
    return AlertApi.getAlert(id)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetAlert());
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestAlertFailure(err.body.message))
          console.error('Error: ', err)
        }
      });
  };
}

export function createAlert(alert) {

  return dispatch => {

    dispatch(requestAlertInit());
    return AlertApi.createAlert(alert)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestCreateAlert());
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestAlertFailure(err.body.message))
          console.error('Error: ', err)
        }
      });

  };
}

export function editAlert(id, alert) {

  return dispatch => {

    dispatch(requestAlertInit());
    return AlertApi.editAlert(id, alert)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestEditAlert());
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestAlertFailure(err.body.message))
          console.error('Error: ', err)
        }
      });

  };
}

export function getAllAlerts(vehicleId, page, size, sort) {

  return dispatch => {

    dispatch(requestAlertInit());
    return AlertApi.getAlerts({
      vehicleId,
      page:page-1,
      size ,
      sort
    })
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetAllAlerts());
        return Promise.resolve(response);
      })
      .catch(err => {
        console.log(err)
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestAlertFailure(err.body.message))
          console.error('Error: ', err)
        }
        
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
          dispatch(requestAlertFailure(err.body.message))
          console.error('Error: ', err)
        }
      });

  };
}