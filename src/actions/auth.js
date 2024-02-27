import { TrakerApi } from '../constants/apiConf';

const UserApi = new TrakerApi.UserAuthControllerApi();

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SESSION='GET_SESSION';

function recieveSession(user) {
  return {
    type: SESSION,
    isFetching: false,
    isAuthenticated: false,
    user,
  };
}

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
    user,
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

function requestSignup() {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
  };
}

export function receiveSignup() {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    message: "Cuenta creada"
  };
}

function signupFailure(message) {
  return {
    type: SIGNUP_FAILURE,
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
    dispatch(requestLogin(creds));
    let authCredentials = new TrakerApi.AuthCredentials();
    authCredentials.nickname = creds.login;
    authCredentials.password = creds.password;
    return UserApi.login(authCredentials)
      .then((response) => {
        console.log(response)
        localStorage.setItem('id_token', response.access_token);
        dispatch(receiveLogin(response));
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(loginError("Unhauthorized"))
          console.error('Error: ', err);
        }else{
          console.error('Error: ', err)}
        }
      );

  };
}

export function signup(data) {

  return dispatch => {
    dispatch(requestSignup());
    return UserApi.signup(data)
      .then((response) => {
        console.log(response)
        dispatch(receiveSignup());
        return Promise.resolve();
      })
      .catch(err => {
        dispatch(signupFailure(err.body.message))
        console.error(err)
        return Promise.reject();
      }
      );
  };
}

export function getSession() {

  return dispatch => {
    return UserApi.session()
      .then((response) => {
        console.log(response)
        dispatch(recieveSession(response));
        return Promise.resolve();
      })
      .catch(err => {
        console.error(err)
        return Promise.reject();
      }
      );
  };
}
export function signupFailurePassword(message) {
  return dispatch => {
    dispatch(signupFailure(message));
  };
};
