# TrakerApi.VehicleControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addGPSDevice**](VehicleControllerApi.md#addGPSDevice) | **POST** /api/vehicle/{vehicleId}/device | 
[**deleteImage**](VehicleControllerApi.md#deleteImage) | **DELETE** /api/vehicle/{vehicleId}/image | 
[**editVehicle**](VehicleControllerApi.md#editVehicle) | **PUT** /api/vehicle/{vehicleId} | 
[**getUserVehicles**](VehicleControllerApi.md#getUserVehicles) | **GET** /api/vehicle | 
[**getVehicle**](VehicleControllerApi.md#getVehicle) | **GET** /api/vehicle/{vehicleId} | 
[**registerVehicle**](VehicleControllerApi.md#registerVehicle) | **POST** /api/vehicle | 
[**removeVehicle**](VehicleControllerApi.md#removeVehicle) | **DELETE** /api/vehicle/{vehicleId} | 
[**setImage**](VehicleControllerApi.md#setImage) | **POST** /api/vehicle/{vehicleId}/image | 



## addGPSDevice

> GPSResponseDto addGPSDevice(vehicleId, gPSDeviceRequestDto)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.VehicleControllerApi();
let vehicleId = 789; // Number | 
let gPSDeviceRequestDto = new TrakerApi.GPSDeviceRequestDto(); // GPSDeviceRequestDto | 
apiInstance.addGPSDevice(vehicleId, gPSDeviceRequestDto).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vehicleId** | **Number**|  | 
 **gPSDeviceRequestDto** | [**GPSDeviceRequestDto**](GPSDeviceRequestDto.md)|  | 

### Return type

[**GPSResponseDto**](GPSResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## deleteImage

> VehicleResponseDto deleteImage(vehicleId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.VehicleControllerApi();
let vehicleId = 789; // Number | 
apiInstance.deleteImage(vehicleId).then((data) => {
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
let vehicleId = 789; // Number | 
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

> ListResponseVehicleShortResponseDto getUserVehicles(opts)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.VehicleControllerApi();
let opts = {
  'page': 0, // Number | 
  'size': 5, // Number | 
  'sort': "'modifiedDate'" // String | 
};
apiInstance.getUserVehicles(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] [default to 0]
 **size** | **Number**|  | [optional] [default to 5]
 **sort** | **String**|  | [optional] [default to &#39;modifiedDate&#39;]

### Return type

[**ListResponseVehicleShortResponseDto**](ListResponseVehicleShortResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getVehicle

> VehicleResponseDto getVehicle(vehicleId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.VehicleControllerApi();
let vehicleId = 789; // Number | 
apiInstance.getVehicle(vehicleId).then((data) => {
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

> removeVehicle(vehicleId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.VehicleControllerApi();
let vehicleId = 789; // Number | 
apiInstance.removeVehicle(vehicleId).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vehicleId** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## setImage

> VehicleResponseDto setImage(vehicleId, image)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.VehicleControllerApi();
let vehicleId = 789; // Number | 
let image = "/path/to/file"; // File | 
apiInstance.setImage(vehicleId, image).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vehicleId** | **Number**|  | 
 **image** | **File**|  | 

### Return type

[**VehicleResponseDto**](VehicleResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: */*

