import { TrakerApi } from "../constants/apiConf";
import { logoutUser } from "./auth";

export const REQUEST_GPS_INIT = 'REQUEST_GPS_INIT';
export const REQUEST_GPS_FAILURE = 'REQUEST_GPS_FAILURE';

export const GET_GPS_SUCCESS = 'GET_GPS_SUCCESS';
export const EDIT_GPS_STATUS_SUCCESS = 'EDIT_GPS_STATUS_SUCCESS';
export const DELETE_GPS_SUCCESS = 'DELETE_GPS_SUCCESS';
export const GET_ALL_GPS_SUCCESS = 'GET_ALL_GPS_SUCCESS';
export const CLEAN_ERROR_GPS= 'CLEAN_ERROR_GPS';

const GpsApi = new TrakerApi.GpsDeviceControllerApi();

function requestGpsInit() {
  return {
    type: REQUEST_GPS_INIT,
    isFetching: true,
  };
}

function requestGetGps(device) {
  return {
    type: GET_GPS_SUCCESS,
    isFetching: false,
    device,
  };
}

function requestEditGpsStatus(device) {
  return {
    type: EDIT_GPS_STATUS_SUCCESS,
    isFetching: false,
    device,
  };
}

function requestDeleteGps() {
  return {
    type: DELETE_GPS_SUCCESS,
    isFetching: false,
  };
}

function requestGetAllGps(deviceList) {
  return {
    type: GET_ALL_GPS_SUCCESS,
    isFetching: false,
    deviceList,
  };
}

function requestGpsFailure(message) {
  return {
    type: REQUEST_GPS_FAILURE,
    isFetching: false,
    errorMessage: message,
  };
}

function cleanErrorGPSAction() {
  return {
    type: CLEAN_ERROR_GPS,
  };
}


export function cleanErrorGpsAction() {
  return dispatch => {
    dispatch(cleanErrorGPSAction())
  };
}



export function deleteGps(gpsId) {

  return dispatch => {

    dispatch(requestGpsInit());
    return GpsApi.deleteGPSDevice(gpsId)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestDeleteGps());
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestGpsFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}

export function getGps(gpsId) {

  return dispatch => {

    dispatch(requestGpsInit());
    return GpsApi.getGPSDevice(gpsId)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetGps(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestGpsFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}


export function getAllGps(vehicleId) {

  return dispatch => {

    dispatch(requestGpsInit());
    return GpsApi.getListGPS(vehicleId)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetAllGps(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestGpsFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}


export function updateStatusGps(gpsId, status) {

  return dispatch => {

    dispatch(requestGpsInit());
    return GpsApi.updateStatusGPS(gpsId, status)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestEditGpsStatus(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestGpsFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}

