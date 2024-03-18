import {
  CLEAN_ERROR_GPS,
  CLOSE_MODAL_GPS,
  DELETE_GPS_SUCCESS,
  EDIT_GPS_STATUS_SUCCESS,
  GET_ALL_GPS_SUCCESS,
  GET_GPS_SUCCESS,
  OPEN_MODAL_GPS,
  REQUEST_GPS_FAILURE,
  REQUEST_GPS_INIT
} from '../actions/gps';

export default function gps(
  state = {
    isFetching: false,
    message: null,
    errorMessage: null,
    device:{},
    deviceList:[],
    modalGpsOpened:false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_GPS_INIT:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: null,
        errorMessage: null,
      });
    case REQUEST_GPS_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        errorMessage:action.errorMessage
      });
    case GET_GPS_SUCCESS:
    case EDIT_GPS_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
        device: action.device,
      });
    case GET_ALL_GPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
        deviceList: action.deviceList,
      });  
    case DELETE_GPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
      });
    case CLEAN_ERROR_GPS:
      return Object.assign({}, state, {
        errorMessage:null,
      });
    case OPEN_MODAL_GPS:
      return Object.assign({}, state, {
        modalGpsOpened:true,
      });
    case CLOSE_MODAL_GPS:
        return Object.assign({}, state, {
          modalGpsOpened:false,
    });
    default:
      return state;
  }
}
