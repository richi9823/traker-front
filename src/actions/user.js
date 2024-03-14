import { TrakerApi } from "../constants/apiConf";
import { logoutUser } from "./auth";

export const REQUEST_USER_INIT = 'REQUEST_USER_INIT';
export const REQUEST_USER_FAILURE = 'REQUEST_USER_FAILURE';

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';


const UserApi = new TrakerApi.UserControllerApi();

function requestUserInit() {
  return {
    type: REQUEST_USER_INIT,
    isFetching: true,
  };
}

function requestGetUser(user) {
  return {
    type: GET_USER_SUCCESS,
    isFetching: false,
    user
  };
}

function requestEditUser(user) {
  return {
    type: EDIT_USER_SUCCESS,
    isFetching: false,
    user,
  };
}

function requestDeleteUser() {
  return {
    type: DELETE_USER_SUCCESS,
    isFetching: false,
  };
}


function requestUserFailure(message) {
  return {
    type: REQUEST_USER_FAILURE,
    isFetching: false,
    errorMessage: message,
  };
}


export function getUser() {

  return dispatch => {

    dispatch(requestUserInit());
    return UserApi.getUserDetails()
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetUser(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestUserFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}

export function editUser(user) {

  return dispatch => {

    dispatch(requestUserInit());
    return UserApi.editUser(user)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestEditUser(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestUserFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}


export function deleteUser() {

  return dispatch => {

    dispatch(requestUserInit());
    return UserApi.deleteUser()
      .then((response) => {
        // Dispatch the success action
        dispatch(requestDeleteUser());
        dispatch(logoutUser())
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestUserFailure(err?.body?.message))
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}