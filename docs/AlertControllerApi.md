# TrakerApi.AlertControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createAlert**](AlertControllerApi.md#createAlert) | **POST** /api/alert | 
[**editAlert**](AlertControllerApi.md#editAlert) | **PUT** /api/alert/{alertId} | 
[**getVehicleAlerts**](AlertControllerApi.md#getVehicleAlerts) | **GET** /api/alert/vehicle/{vehicleId}/alerts | 
[**removeAlert**](AlertControllerApi.md#removeAlert) | **DELETE** /api/alert/{alertId} | 



## createAlert

> AlertResponseDto createAlert(alertRequestDto)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.AlertControllerApi();
let alertRequestDto = new TrakerApi.AlertRequestDto(); // AlertRequestDto | 
apiInstance.createAlert(alertRequestDto).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **alertRequestDto** | [**AlertRequestDto**](AlertRequestDto.md)|  | 

### Return type

[**AlertResponseDto**](AlertResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## editAlert

> AlertResponseDto editAlert(alertId, alertRequestDto)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.AlertControllerApi();
let alertId = 56; // Number | 
let alertRequestDto = new TrakerApi.AlertRequestDto(); // AlertRequestDto | 
apiInstance.editAlert(alertId, alertRequestDto).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **alertId** | **Number**|  | 
 **alertRequestDto** | [**AlertRequestDto**](AlertRequestDto.md)|  | 

### Return type

[**AlertResponseDto**](AlertResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## getVehicleAlerts

> [AlertResponseDto] getVehicleAlerts(vehicleId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.AlertControllerApi();
let vehicleId = 56; // Number | 
apiInstance.getVehicleAlerts(vehicleId).then((data) => {
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

[**[AlertResponseDto]**](AlertResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## removeAlert

> Object removeAlert(alertId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.AlertControllerApi();
let alertId = 56; // Number | 
apiInstance.removeAlert(alertId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **alertId** | **Number**|  | 

### Return type

**Object**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

