# TrakerApi.NotificationControllerApi

All URIs are relative to *https://200.234.235.51:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getNotification**](NotificationControllerApi.md#getNotification) | **GET** /api/notification/{notificationId} | 
[**getNotifications**](NotificationControllerApi.md#getNotifications) | **GET** /api/notification | 
[**readNotification**](NotificationControllerApi.md#readNotification) | **PUT** /api/notification/{notificationId} | 



## getNotification

> NotificationResponseDto getNotification(notificationId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.NotificationControllerApi();
let notificationId = 789; // Number | 
apiInstance.getNotification(notificationId).then((data) => {
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

[**NotificationResponseDto**](NotificationResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getNotifications

> ListResponseNotificationShortResponseDto getNotifications(opts)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.NotificationControllerApi();
let opts = {
  'vehicleId': 789, // Number | 
  'alertId': 789, // Number | 
  'readed': false, // Boolean | 
  'page': 0, // Number | 
  'size': 5, // Number | 
  'sort': "'read'" // String | 
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
 **vehicleId** | **Number**|  | [optional] 
 **alertId** | **Number**|  | [optional] 
 **readed** | **Boolean**|  | [optional] [default to false]
 **page** | **Number**|  | [optional] [default to 0]
 **size** | **Number**|  | [optional] [default to 5]
 **sort** | **String**|  | [optional] [default to &#39;read&#39;]

### Return type

[**ListResponseNotificationShortResponseDto**](ListResponseNotificationShortResponseDto.md)

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
let notificationId = 789; // Number | 
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

