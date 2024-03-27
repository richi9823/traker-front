# TrakerApi.GpsDeviceControllerApi

All URIs are relative to *https://200.234.235.51:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteGPSDevice**](GpsDeviceControllerApi.md#deleteGPSDevice) | **DELETE** /api/gps/{gpsId} | 
[**getGPSDevice**](GpsDeviceControllerApi.md#getGPSDevice) | **GET** /api/gps/{gpsId} | 
[**getListGPS**](GpsDeviceControllerApi.md#getListGPS) | **POST** /api/gps/vehicle/{vehicleId} | 
[**updateStatusGPS**](GpsDeviceControllerApi.md#updateStatusGPS) | **PUT** /api/gps/{gpsId} | 



## deleteGPSDevice

> deleteGPSDevice(gpsId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.GpsDeviceControllerApi();
let gpsId = 789; // Number | 
apiInstance.deleteGPSDevice(gpsId).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **gpsId** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## getGPSDevice

> GPSResponseDto getGPSDevice(gpsId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.GpsDeviceControllerApi();
let gpsId = 789; // Number | 
apiInstance.getGPSDevice(gpsId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **gpsId** | **Number**|  | 

### Return type

[**GPSResponseDto**](GPSResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getListGPS

> [GPSShortResponseDto] getListGPS(vehicleId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.GpsDeviceControllerApi();
let vehicleId = 789; // Number | 
apiInstance.getListGPS(vehicleId).then((data) => {
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

[**[GPSShortResponseDto]**](GPSShortResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## updateStatusGPS

> GPSResponseDto updateStatusGPS(gpsId, status)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.GpsDeviceControllerApi();
let gpsId = 789; // Number | 
let status = "status_example"; // String | 
apiInstance.updateStatusGPS(gpsId, status).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **gpsId** | **Number**|  | 
 **status** | **String**|  | 

### Return type

[**GPSResponseDto**](GPSResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

