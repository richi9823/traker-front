import { TrakerApi } from "../constants/apiConf";
import { logoutUser } from "./user";

export const REQUEST_VEHICLE_INIT = 'REQUEST_VEHICLE_INIT';
export const GET_VEHICLE = 'GET_VEHICLE';
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

function requestCreateVehicle() {
  return {
    type: CREATE_VEHICLE_SUCCESS,
    isFetching: false,
    message:"Vehiculo registrado"
  };
}

function requestGetVehicle(data) {
  return {
    type: CREATE_VEHICLE_SUCCESS,
    isFetching: false,
    selected:data
  };
}

function requestDeleteVehicle() {
  return {
    type: DELETE_VEHICLE_SUCCESS,
    isFetching: false,
  };
}

function requestEditVehicle() {
  return {
    type: EDIT_VEHICLE_SUCCESS,
    isFetching: false,
    message:"Edicion completa"
  };
}

function requestFecthVehicles(vehicles) {
  return {
    type: FETCH_VEHICLE_SUCCESS,
    isFetching: false,
    vehicles
  };
}

function requestVehicleFailure() {
  return {
    type: REQUEST_VEHICLE_FAILURE,
    isFetching: false,
  };
}

export function getVehicle(id) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.getVehicle(id)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetVehicle(response));
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

export function createVehicle(vehicle) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.registerVehicle(vehicle)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestCreateVehicle());
        dispatch(fetchVehicles(1,5));
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
        dispatch(requestEditVehicle());
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

export function fetchVehicles(page, size) {

  return dispatch => {

    dispatch(requestVehicleInit());
    return VehicleApi.getUserVehicles({
      page:page-1,
      size 
    })
      .then((response) => {
        // Dispatch the success action
        dispatch(requestFecthVehicles(response));
        return Promise.resolve(response);
      })
      .catch(err => {
        console.log(err)
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
        dispatch(requestDeleteVehicle());
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