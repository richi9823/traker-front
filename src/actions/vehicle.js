import { TrakerApi } from "../constants/apiConf";
import { logoutUser } from "./auth";

export const REQUEST_VEHICLE_INIT = 'REQUEST_VEHICLE_INIT';
export const REQUEST_VEHICLE_FAILURE = 'REQUEST_VEHICLE_FAILURE';

export const GET_VEHICLE_SUCCESS = 'GET_VEHICLE_SUCCESS';
export const CREATE_VEHICLE_SUCCESS = 'CREATE_VEHICLE_SUCCESS';
export const DELETE_VEHICLE_SUCCESS = 'DELETE_VEHICLE_SUCCESS';
export const EDIT_VEHICLE_SUCCESS = 'EDIT_VEHICLE_SUCCESS';
export const GET_ALL_VEHICLES_SUCCESS = 'GET_ALL_VEHICLES_SUCCESS';
export const ADD_GPS_SUCCESS = 'ADD_GPS_SUCCESS';
export const SET_IMAGE_SUCCESS = 'SET_IMAGE_SUCCESS';
export const DELETE_IMAGE_SUCCESS = 'SET_IMAGE_SUCCESS';
export const EDIT_VEHICLE_RECORD = 'EDIT_VEHICLE_RECORD';
export const CLEAN_ERROR_VEHICLE = 'CLEAN_ERROR_VEHICLE';

const VehicleApi = new TrakerApi.VehicleControllerApi();

function requestVehicleInit() {
  return {
    type: REQUEST_VEHICLE_INIT,
    isFetching: true,
  };
}

function requestCreateVehicle(vehicle) {
  return {
    type: CREATE_VEHICLE_SUCCESS,
    isFetching: false,
    message:"Vehiculo registrado",
    vehicle,
  };
}

function requestGetVehicle(vehicle) {
  return {
    type: CREATE_VEHICLE_SUCCESS,
    isFetching: false,
    vehicle
  };
}

function requestDeleteVehicle() {
  return {
    type: DELETE_VEHICLE_SUCCESS,
    isFetching: false,
  };
}

function requestEditVehicle(vehicle) {
  return {
    type: EDIT_VEHICLE_SUCCESS,
    isFetching: false,
    message:"Edicion completa",
    vehicle,
  };
}

function editRecord(name, newValue) {
  return {
    type: EDIT_VEHICLE_RECORD,
    name,
    newValue
  };
}

function cleanErrorVehicleAction() {
  return {
    type: CLEAN_ERROR_VEHICLE,
  };
}




function requestGetAllVehicles(vehicleList) {
  return {
    type: GET_ALL_VEHICLES_SUCCESS,
    isFetching: false,
    vehicleList,
  };
}


function requestAddGps() {
  return {
    type: ADD_GPS_SUCCESS,
    isFetching: false,
  };
}


function requestSetImage(vehicle) {
  return {
    type: SET_IMAGE_SUCCESS,
    isFetching: false,
    vehicle,
  };
}


function requestDeleteImage() {
  return {
    type: DELETE_IMAGE_SUCCESS,
    isFetching: false,
  };
}

function requestVehicleFailure(message) {
  return {
    type: REQUEST_VEHICLE_FAILURE,
    isFetching: false,
    errorMessage: message
  };
}


export function addGpsDevice(vehicleId, gps) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.addGPSDevice(vehicleId, gps)
      .then(() => {
        // Dispatch the success action
        dispatch(requestAddGps());
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestVehicleFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}

export function addImage(vehicleId, image) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.setImage(vehicleId, image)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestSetImage(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestVehicleFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}

export function deleteImage(vehicleId) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.deleteImage(vehicleId)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestDeleteImage());
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestVehicleFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}


export function editVehicle(id, vehicle) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.editVehicle(id, vehicle)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestEditVehicle(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestVehicleFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });

  };
}

export function cleanErrorVehicle() {
  return dispatch => {
    dispatch(cleanErrorVehicleAction())
  };
}


export function editVehicleRecord(name, newValue) {
  return dispatch => {
    dispatch(editRecord(name,newValue))
  };
}

export function getAllVehicles(page, size, sort) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.getUserVehicles({
      page:page-1,
      size,
      sort 
    })
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetAllVehicles(response));
        return Promise.resolve();
      })
      .catch(err => {
        console.log(err)
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestVehicleFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });

  };
}

export function getVehicle(id) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.getVehicle(id)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetVehicle(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestVehicleFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}

export function createVehicle(vehicle) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.registerVehicle(vehicle)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestCreateVehicle(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestVehicleFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });

  };
}


export function removeVehicle(id) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.removeVehicle(id)
      .then(() => {
        // Dispatch the success action
        dispatch(requestDeleteVehicle());
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestVehicleFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });

  };
}