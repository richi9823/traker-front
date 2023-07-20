# TrakerApi.VehicleControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**editVehicle**](VehicleControllerApi.md#editVehicle) | **PUT** /api/vehicle/{vehicleId} | 
[**getUserVehicles**](VehicleControllerApi.md#getUserVehicles) | **GET** /api/vehicle | 
[**registerVehicle**](VehicleControllerApi.md#registerVehicle) | **POST** /api/vehicle | 
[**removeVehicle**](VehicleControllerApi.md#removeVehicle) | **DELETE** /api/vehicle/{vehicleId} | 



## editVehicle

> VehicleResponseDto editVehicle(vehicleId, vehicleRequestDto)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.VehicleControllerApi();
let vehicleId = 56; // Number | 
let vehicleRequestDto = new TrakerApi.VehicleRequestDto(); // VehicleRequestDto | 
apiInstance.editVehicle(vehicleId, vehicleRequestDto).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vehicleId** | **Number**|  | 
 **vehicleRequestDto** | [**VehicleRequestDto**](VehicleRequestDto.md)|  | 

### Return type

[**VehicleResponseDto**](VehicleResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## getUserVehicles

> [VehicleResponseDto] getUserVehicles()



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.VehicleControllerApi();
apiInstance.getUserVehicles().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[VehicleResponseDto]**](VehicleResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## registerVehicle

> VehicleResponseDto registerVehicle(vehicleRequestDto)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.VehicleControllerApi();
let vehicleRequestDto = new TrakerApi.VehicleRequestDto(); // VehicleRequestDto | 
apiInstance.registerVehicle(vehicleRequestDto).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vehicleRequestDto** | [**VehicleRequestDto**](VehicleRequestDto.md)|  | 

### Return type

[**VehicleResponseDto**](VehicleResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## removeVehicle

> VehicleResponseDto removeVehicle(vehicleId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.VehicleControllerApi();
let vehicleId = 56; // Number | 
apiInstance.removeVehicle(vehicleId).then((data) => {
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

[**VehicleResponseDto**](VehicleResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

