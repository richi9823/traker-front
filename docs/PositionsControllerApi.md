# TrakerApi.PositionsControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getVehiclePositions**](PositionsControllerApi.md#getVehiclePositions) | **GET** /api/position/vehicle/{vehicleId}/positions | 



## getVehiclePositions

> [PositionsResponseDto] getVehiclePositions(vehicleId, opts)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.PositionsControllerApi();
let vehicleId = 56; // Number | 
let opts = {
  'since': "since_example", // String | 
  'interval': "interval_example" // String | 
};
apiInstance.getVehiclePositions(vehicleId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vehicleId** | **Number**|  | 
 **since** | **String**|  | [optional] 
 **interval** | **String**|  | [optional] 

### Return type

[**[PositionsResponseDto]**](PositionsResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

