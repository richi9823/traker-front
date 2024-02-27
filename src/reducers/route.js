import {
DELETE_ROUTE_SUCCESS,
GET_ALL_ROUTES_SUCCESS,
GET_ROUTE_SUCCESS,
REQUEST_ROUTE_FAILURE,
REQUEST_ROUTE_INIT
} from '../actions/route';

export default function route(
  state = {
    isFetching: false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_ROUTE_INIT:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: null,
        errorMessage: null,
      });
    case REQUEST_ROUTE_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        errorMessage:action.errorMessage
      });
    case GET_ROUTE_SUCCESS:
    case GET_ALL_ROUTES_SUCCESS:
    case DELETE_ROUTE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        message: action.message,
      });
    default:
      return state;
  }
}
