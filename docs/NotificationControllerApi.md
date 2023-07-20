# TrakerApi.NotificationControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAlertNotifications**](NotificationControllerApi.md#getAlertNotifications) | **GET** /api/notification/alert/{alertId}/notifications | 
[**getNotifications**](NotificationControllerApi.md#getNotifications) | **GET** /api/notification | 
[**getPendingNotifications**](NotificationControllerApi.md#getPendingNotifications) | **GET** /api/notification/pending | 
[**getVehicleNotifications**](NotificationControllerApi.md#getVehicleNotifications) | **GET** /api/notification/vehicle/{vehicleId}/notifications | 
[**readNotification**](NotificationControllerApi.md#readNotification) | **PUT** /api/notification/{notificationId} | 



## getAlertNotifications

> [NotificationResponseDto] getAlertNotifications(alertId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.NotificationControllerApi();
let alertId = 56; // Number | 
apiInstance.getAlertNotifications(alertId).then((data) => {
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

[**[NotificationResponseDto]**](NotificationResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getNotifications

> [NotificationResponseDto] getNotifications()



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.NotificationControllerApi();
apiInstance.getNotifications().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[NotificationResponseDto]**](NotificationResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getPendingNotifications

> [NotificationResponseDto] getPendingNotifications()



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.NotificationControllerApi();
apiInstance.getPendingNotifications().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[NotificationResponseDto]**](NotificationResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getVehicleNotifications

> [NotificationResponseDto] getVehicleNotifications(vehicleId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.NotificationControllerApi();
let vehicleId = 56; // Number | 
apiInstance.getVehicleNotifications(vehicleId).then((data) => {
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

[**[NotificationResponseDto]**](NotificationResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## readNotification

> Object readNotification(notificationId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.NotificationControllerApi();
let notificationId = 56; // Number | 
apiInstance.readNotification(notificationId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **notificationId** | **Number**|  | 

### Return type

**Object**

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

