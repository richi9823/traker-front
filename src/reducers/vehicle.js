import {
  CREATE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_SUCCESS,
  EDIT_VEHICLE_SUCCESS,
  REQUEST_VEHICLE_FAILURE,
  REQUEST_VEHICLE_INIT,
  ADD_GPS_SUCCESS,
  DELETE_IMAGE_SUCCESS,
  GET_ALL_VEHICLES_SUCCESS,
  GET_VEHICLE_SUCCESS,
  SET_IMAGE_SUCCESS,
  EDIT_VEHICLE_RECORD,
  CLEAN_ERROR_VEHICLE
} from '../actions/vehicle';

export default function vehicle(
  state = {
    isFetching: false,
    message: null,
    errorMessage: null,
    vehicle:{},
    vehicleList:{items:[], total: 0},
  },
  action,
) {
  switch (action.type) {
    case REQUEST_VEHICLE_INIT:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: null,
        errorMessage: null,
      });
    case REQUEST_VEHICLE_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        errorMessage:action.errorMessage
      });
    case CREATE_VEHICLE_SUCCESS:
    case EDIT_VEHICLE_SUCCESS:
    case GET_VEHICLE_SUCCESS:
    case SET_IMAGE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
        vehicle: action.vehicle,
      });
    case GET_ALL_VEHICLES_SUCCESS: 
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
        vehicleList: action.vehicleList,
      });
    case EDIT_VEHICLE_RECORD: 
    return Object.assign({}, state, {
      vehicle: {
        ...state.vehicle,
        [action.name]: action.newValue,
      }
    });     
    case DELETE_VEHICLE_SUCCESS:
    case ADD_GPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
      });
    case DELETE_IMAGE_SUCCESS:  
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        vehicle: {
          ...state.vehicle,
          image: null,
        }
      });
    case CLEAN_ERROR_VEHICLE:
      return Object.assign({}, state, {
        errorMessage:null,
      });
    default:
      return state;
  }
}
