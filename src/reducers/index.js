import { combineReducers } from 'redux';
import auth from './auth';
import runtime from './runtime';
import navigation from './navigation';
import vehicle from './vehicle';
import gps from './gps';
import alert from './alert';
import notification from './notification';
import position from './position';
import route from './route';
import userDetails from './userDetails';

export default combineReducers({
  auth,
  runtime,
  navigation,
  vehicle,
  gps,
  position,
  route,
  alert,
  notification,
  userDetails
});
