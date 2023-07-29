import { TrakerApi } from "../constants/apiConf";
import { logoutUser } from "./user";

export const REQUEST_VEHICLE_INIT = 'REQUEST_VEHICLE_INIT';
export const CREATE_VEHICLE_SUCCESS = 'CREATE_VEHICLE_SUCCESS';
export const DELETE_VEHICLE_SUCCESS = 'DELETE_VEHICLE_SUCCESS';
export const EDIT_VEHICLE_SUCCESS = 'EDIT_VEHICLE_SUCCESS';
export const FETCH_VEHICLE_SUCCESS = 'FETCH_VEHICLE_SUCCESS';
export const REQUEST_VEHICLE_FAILURE = 'REQUEST_VEHICLE_FAILURE';

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
    vehicle,
    message:"Vehiculo registrado"
  };
}

function requestDeleteVehicle(id) {
  return {
    type: DELETE_VEHICLE_SUCCESS,
    isFetching: false,
    id,
  };
}

function requestEditVehicle(vehicle) {
  return {
    type: EDIT_VEHICLE_SUCCESS,
    isFetching: false,
    vehicle,
  };
}

function requestFecthVehicles(vehicles) {
  return {
    type: FETCH_VEHICLE_SUCCESS,
    isFetching: false,
    vehicles
  };
}

function requestVehicleFailure(message) {
  return {
    type: REQUEST_VEHICLE_FAILURE,
    isFetching: false,
    message,
  };
}

export function createVehicle(vehicle) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.registerVehicle(vehicle)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestCreateVehicle(response));
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestVehicleFailure(err.body.message))
          console.error('Error: ', err)
        }
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
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestVehicleFailure(err.body.message))
          console.error('Error: ', err)
        }
      });

  };
}

export function fetchVehicles() {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.getUserVehicles()
      .then((response) => {
        // Dispatch the success action
        dispatch(requestFecthVehicles(response));
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestVehicleFailure(err.body.message))
          console.error('Error: ', err)
        }
        
      });

  };
}

export function removeVehicle(id) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.removeVehicle(id)
      .then(() => {
        // Dispatch the success action
        dispatch(requestDeleteVehicle(id));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestVehicleFailure(err.body.message))
          console.error('Error: ', err)
        }
      });

  };
}