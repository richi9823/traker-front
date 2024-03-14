import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, SESSION
} from '../actions/auth';
import { EDIT_USER_SUCCESS } from '../actions/user';

const token = localStorage.getItem('token');
export default function auth(state = {
  isFetching: false,
  isAuthenticated: !!token,
}, action) {
  switch (action.type) {
    case SESSION:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: true,
              user:action.user
          });
      case LOGIN_REQUEST:
          return Object.assign({}, state, {
              isFetching: true,
              isAuthenticated: false,
              message: ''
          });
      case LOGIN_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: true,
              errorMessage: '',
              message: '',
              user:action.user
          });
      case LOGIN_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: false,
              errorMessage: action.message,
              message: '',
              user:null,
          });
      case LOGOUT_SUCCESS:
          return Object.assign({}, state, {
              isAuthenticated: false,
              message: '',
              user:null,
          });
      case SIGNUP_REQUEST:
          return Object.assign({}, state, {
              isFetching: true,
              message: ''
          });
      case SIGNUP_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              errorMessage: '',
              message: action.message
          });
      case SIGNUP_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
              errorMessage: action.message,
              message: ''
          });
      case EDIT_USER_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.message,
            message: '',
            user:action.user
        });    
      default:
          return state;
  }
}
