import { TrakerApi } from "../constants/apiConf";
import { logoutUser } from "./auth";


export const GET_POSITION_SUCCESS = 'GET_POSITION_SUCCESS';


const PositionApi = new TrakerApi.PositionsControllerApi();


function requestGetPosition(position) {
  return {
    type: GET_POSITION_SUCCESS,
    position
  };
}



export function getPosition(vehicleId) {

  return dispatch => {
    return PositionApi.getLastPosition(vehicleId)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetPosition(response));
        return Promise.resolve();
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          console.error('Error: ', err)
        }
        return Promise.reject(err)
      });
  };
}