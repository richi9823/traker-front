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
  SET_IMAGE_SUCCESS
} from '../actions/vehicle';

export default function vehicle(
  state = {
    isFetching: false,
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
    case DELETE_VEHICLE_SUCCESS:
    case EDIT_VEHICLE_SUCCESS:
    case ADD_GPS_SUCCESS:
    case DELETE_IMAGE_SUCCESS:
    case GET_ALL_VEHICLES_SUCCESS:
    case GET_VEHICLE_SUCCESS:
    case SET_IMAGE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
      });
    default:
      return state;
  }
}
