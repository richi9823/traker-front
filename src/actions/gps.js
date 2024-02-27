import { TrakerApi } from "../constants/apiConf";
import { logoutUser } from "./auth";

export const REQUEST_GPS_INIT = 'REQUEST_GPS_INIT';
export const REQUEST_GPS_FAILURE = 'REQUEST_GPS_FAILURE';

export const GET_GPS_SUCCESS = 'GET_GPS_SUCCESS';
export const EDIT_GPS_STATUS_SUCCESS = 'EDIT_GPS_STATUS_SUCCESS';
export const DELETE_GPS_SUCCESS = 'DELETE_GPS_SUCCESS';
export const GET_ALL_GPS_SUCCESS = 'GET_ALL_GPS_SUCCESS';


const GpsApi = new TrakerApi.GpsDeviceControllerApi();

function requestGpsInit() {
  return {
    type: REQUEST_GPS_INIT,
    isFetching: true,
  };
}

function requestGetGps() {
  return {
    type: GET_GPS_SUCCESS,
    isFetching: false,
  };
}

function requestEditGpsStatus() {
  return {
    type: EDIT_GPS_STATUS_SUCCESS,
    isFetching: false,
  };
}

function requestDeleteGps() {
  return {
    type: DELETE_GPS_SUCCESS,
    isFetching: false,
  };
}

function requestGetAllGps() {
  return {
    type: GET_ALL_GPS_SUCCESS,
    isFetching: false,
  };
}

function requestGpsFailure() {
  return {
    type: REQUEST_GPS_FAILURE,
    isFetching: false,
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
          dispatch(requestGpsFailure(err.body.message))
          console.error('Error: ', err)
        }
      });
  };
}

export function getGps(gpsId) {

  return dispatch => {

    dispatch(requestGpsInit());
    return GpsApi.getGPSDevice(gpsId)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetGps());
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestGpsFailure(err.body.message))
          console.error('Error: ', err)
        }
      });
  };
}


export function getAllGps(vehicleId) {

  return dispatch => {

    dispatch(requestGpsInit());
    return GpsApi.getListGPS(vehicleId)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetAllGps());
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestGpsFailure(err.body.message))
          console.error('Error: ', err)
        }
      });
  };
}


export function updateStatusGps(gpsId, status) {

  return dispatch => {

    dispatch(requestGpsInit());
    return GpsApi.updateStatusGPS(gpsId, status)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestEditGpsStatus());
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestGpsFailure(err.body.message))
          console.error('Error: ', err)
        }
      });
  };
}

