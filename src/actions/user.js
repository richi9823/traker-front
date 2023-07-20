import appConfig from '../config';
import { TrakerApi } from '../constants/apiConf';

const UserApi = new TrakerApi.UserControllerApi();

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.access_token,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    document.cookie = 'id_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {

  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
    let authCredentials = new TrakerApi.AuthCredentials();
    authCredentials.nickname = creds.login;
    authCredentials.password = creds.password;
    return UserApi.login(authCredentials)
      .then((response) => {
        //if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
        //  dispatch(loginError(user.message));
        //  return Promise.reject(user);
        //}
        // in posts create new action and check http status, if malign logout
        // If login was successful, set the token in local storage
        console.log(response)
        localStorage.setItem('id_token', response.access_token);
        // Dispatch the success action
        dispatch(receiveLogin(response));
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(loginError("Unhauthorized"))
          console.error("Unhauthorized")
        }else{
          console.error('Error: ', err)}
        }
      );

  };
}
