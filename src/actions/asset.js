import { TrakerApi } from "../constants/apiConf";
import { logoutUser } from "./auth";

export const REQUEST_ASSET_INIT = 'REQUEST_ASSET_INIT';
export const REQUEST_ASSET_FAILURE = 'REQUEST_ASSET_FAILURE';
export const GET_ASSET_SUCCESS = 'GET_ASSET_SUCCESS';


const AssetApi = new TrakerApi.AssetControllerApi();

function requestAssetInit() {
  return {
    type: REQUEST_ASSET_INIT,

  };
}

function requestGetAsset() {
  return {
    type: GET_ASSET_SUCCESS,

  };
}

function requestAssetFailure(message) {
  return {
    type: REQUEST_ASSET_FAILURE,
    errorMessage: message,
  };
}


export function getAsset(assetId) {

  return dispatch => {

    dispatch(requestAssetInit());
    return AssetApi.getAsset(assetId)
      .then((response) => {
        // Dispatch the success action
        dispatch(requestGetAsset());
        return Promise.resolve(response);
      })
      .catch(err => {
        if(err.status === 401){
          dispatch(logoutUser())
        }else{
          dispatch(requestAssetFailure(err?.body?.message))
          console.error('Error: ', err)
        }
      });
  };
}