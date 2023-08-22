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

> ListResponseNotificationResponseDto getAlertNotifications(alertId, opts)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.NotificationControllerApi();
let alertId = 56; // Number | 
let opts = {
  'page': 0, // Number | 
  'size': 5, // Number | 
  'sort': "'modifiedDate'" // String | 
};
apiInstance.getAlertNotifications(alertId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **alertId** | **Number**|  | 
 **page** | **Number**|  | [optional] [default to 0]
 **size** | **Number**|  | [optional] [default to 5]
 **sort** | **String**|  | [optional] [default to &#39;modifiedDate&#39;]

### Return type

[**ListResponseNotificationResponseDto**](ListResponseNotificationResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getNotifications

> ListResponseNotificationResponseDto getNotifications(opts)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.NotificationControllerApi();
let opts = {
  'page': 0, // Number | 
  'size': 5, // Number | 
  'sort': "'modifiedDate'" // String | 
};
apiInstance.getNotifications(opts).then((data) => {
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

[**ListResponseNotificationResponseDto**](ListResponseNotificationResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getPendingNotifications

> ListResponseNotificationResponseDto getPendingNotifications(opts)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.NotificationControllerApi();
let opts = {
  'page': 0, // Number | 
  'size': 5, // Number | 
  'sort': "'modifiedDate'" // String | 
};
apiInstance.getPendingNotifications(opts).then((data) => {
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

[**ListResponseNotificationResponseDto**](ListResponseNotificationResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getVehicleNotifications

> ListResponseNotificationResponseDto getVehicleNotifications(vehicleId, opts)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.NotificationControllerApi();
let vehicleId = 56; // Number | 
let opts = {
  'page': 0, // Number | 
  'size': 5, // Number | 
  'sort': "'modifiedDate'" // String | 
};
apiInstance.getVehicleNotifications(vehicleId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vehicleId** | **Number**|  | 
 **page** | **Number**|  | [optional] [default to 0]
 **size** | **Number**|  | [optional] [default to 5]
 **sort** | **String**|  | [optional] [default to &#39;modifiedDate&#39;]

### Return type

[**ListResponseNotificationResponseDto**](ListResponseNotificationResponseDto.md)

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

