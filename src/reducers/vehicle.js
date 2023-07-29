import {
  CREATE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_SUCCESS,
  EDIT_VEHICLE_SUCCESS,
  FETCH_VEHICLE_SUCCESS,
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
      let { vehicles } = state;
      if(vehicles == null) vehicles = [];
      vehicles[action.vehicle.id] = action.vehicle;
      return Object.assign({}, state, {
        isFetching: false,
        vehicles
      });
    }
    case DELETE_VEHICLE_SUCCESS:{
      const { vehicles } = state;
      if(vehicles != null) {
        var i = vehicles.indexOf(vehicles[action.id])
        vehicles.splice(i,i)
      }
      return Object.assign({}, state, {
        isFetching: false,
        vehicles
      });
    }
    case CREATE_VEHICLE_SUCCESS:{
      var { vehicles } = state;
      if(vehicles == null) vehicles = [];
      vehicles[action.vehicle.id] = action.vehicle;
      
      return Object.assign({}, state, {
        isFetching: false,
        vehicles,
        message:action.message
      });
    }
    default:
      return state;
  }
}
