import { TrakerApi } from "../constants/apiConf";
import { logoutUser } from "./auth";

export const REQUEST_ROUTE_INIT = 'REQUEST_ROUTE_INIT';
export const REQUEST_ROUTE_FAILURE = 'REQUEST_ROUTE_FAILURE';

export const DELETE_ROUTE_SUCCESS = 'DELETE_ROUTE_SUCCESS';
export const GET_ROUTE_SUCCESS = 'GET_ROUTE_SUCCESS';
export const GET_ALL_ROUTES_SUCCESS = 'GET_ALL_ROUTES_SUCCESS';


const RouteApi = new TrakerApi.RoutesControllerApi();

function requestRouteInit() {
  return {
    type: REQUEST_ROUTE_INIT,
    isFetching: true,
  };
}

function requestGetRoute() {
  return {
    type: GET_ROUTE_SUCCESS,
    isFetching: false,
  };
}

function requestGetAllRoutes() {
  return {
    type: GET_ALL_ROUTES_SUCCESS,
    isFetching: false,
  };
}

function requestDeleteRoute() {
  return {
    type: DELETE_ROUTE_SUCCESS,
    isFetching: false,
  };
}


function requestRouteFailure(message) {
  return {
    type: REQUEST_ROUTE_FAILURE,
    isFetching: false,
    errorMessage: message,
  };
}


export function getAllRoute(vehicleId, page, size, since, until) {

  return dispatch => {

    dispatch(requestRouteInit());
    var opts={
      page,
      size, 
      since,
      until
    }
    return RouteApi.getVehicleRoutes(vehicleId, opts)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetAllRoutes());
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestRouteFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}

export function getRoute(routeId) {

  return dispatch => {

    dispatch(requestRouteInit());
    return RouteApi.getRoute(routeId)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetRoute());
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestRouteFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}

export function deleteRoute(routeId) {

  return dispatch => {

    dispatch(requestRouteInit());
    return RouteApi.deleteRoute(routeId)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestDeleteRoute());
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestRouteFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}
