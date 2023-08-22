import {
  CREATE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_SUCCESS,
  EDIT_VEHICLE_SUCCESS,
  FETCH_VEHICLE_SUCCESS,
  GET_VEHICLE,
  REQUEST_VEHICLE_FAILURE,
  REQUEST_VEHICLE_INIT
} from '../actions/vehicle';

export default function posts(
  state = {
    isFetching: false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_VEHICLE_INIT:
      return Object.assign({}, state, {
        isFetching: true,
        message: null,
      });
    case REQUEST_VEHICLE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message:action.message
      });
    case FETCH_VEHICLE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        vehicles: action.vehicles,
      });
    case EDIT_VEHICLE_SUCCESS:{
      return Object.assign({}, state, {
        isFetching: false,
        message:action.message
      });
    }
    case DELETE_VEHICLE_SUCCESS:{
      return Object.assign({}, state, {
      });
    }
    case CREATE_VEHICLE_SUCCESS:{
      return Object.assign({}, state, {
        isFetching: false,
        message:action.message
      });
    }
    case GET_VEHICLE:{
      return Object.assign({}, state, {
        isFetching: false,
        selected:action.selected
      });
    }
    default:
      return state;
  }
}
