# TrakerApi.PositionsControllerApi

All URIs are relative to *https://200.234.235.51:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getLastPosition**](PositionsControllerApi.md#getLastPosition) | **GET** /api/position/vehicle/{vehicleId} | 



## getLastPosition

> FullPositionResponseDto getLastPosition(vehicleId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.PositionsControllerApi();
let vehicleId = 789; // Number | 
apiInstance.getLastPosition(vehicleId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vehicleId** | **Number**|  | 

### Return type

[**FullPositionResponseDto**](FullPositionResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

