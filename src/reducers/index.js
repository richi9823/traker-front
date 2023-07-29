import { combineReducers } from 'redux';
import auth from './auth';
import runtime from './runtime';
import navigation from './navigation';
import vehicle from './vehicle';

export default combineReducers({
  auth,
  runtime,
  navigation,
  vehicle,
});
