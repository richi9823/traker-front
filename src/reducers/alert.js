import {
  CREATE_ALERT_SUCCESS,
  DELETE_ALERT_SUCCESS,
  EDIT_ALERT_SUCCESS,
  EDIT_RECORD_ALERT,
  GET_ALERT_SUCCESS,
  GET_ALL_ALERTS_SUCCESS,
  REQUEST_ALERTS_FAILURE,
  REQUEST_ALERT_INIT
} from '../actions/alert';
import { cloneObject } from '../util';

export default function alert(
  state = {
    isFetching: false,
    message: null,
    errorMessage: null,
    alert:{},
    alertList:{items:[], total: 0},
  },
  action,
) {
  switch (action.type) {
    case REQUEST_ALERT_INIT:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: null,
        errorMessage:null,
      });
    case REQUEST_ALERTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        errorMessage:action.errorMessage,
      });
    case CREATE_ALERT_SUCCESS:
    case GET_ALERT_SUCCESS:  
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
        alert: action.alert,
      });
    
    case EDIT_ALERT_SUCCESS:
      if(state.alertList.items){
        var list = cloneObject(state.alertList.items)
        var objIndex = list.findIndex(obj => obj.id === action.alert.id)
        if(objIndex!==-1){
          list[objIndex] = action.alert
        }
      }
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
        alert: action.alert,
        alertList:{
          ...state.alertList,
          items: list
        }
      });
    
    case GET_ALL_ALERTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
        alertList: action.alertList,
      });
    case DELETE_ALERT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
      });
    case EDIT_RECORD_ALERT: 
    return Object.assign({}, state, {
      alert: {
        ...state.alert,
        [action.name]: action.newValue,
      }
    });  
    default:
      return state;
  }
}
