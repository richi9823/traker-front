# TrakerApi.UserControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**login**](UserControllerApi.md#login) | **POST** /auth/user/login | 
[**session**](UserControllerApi.md#session) | **GET** /auth/user/session | 
[**signup**](UserControllerApi.md#signup) | **POST** /auth/user | 



## login

> UserResponseDto login(authCredentials)



### Example

```javascript
import TrakerApi from 'traker_api';

let apiInstance = new TrakerApi.UserControllerApi();
let authCredentials = new TrakerApi.AuthCredentials(); // AuthCredentials | 
apiInstance.login(authCredentials).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authCredentials** | [**AuthCredentials**](AuthCredentials.md)|  | 

### Return type

[**UserResponseDto**](UserResponseDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## session

> UserResponseDto session()



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.UserControllerApi();
apiInstance.session().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**UserResponseDto**](UserResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## signup

> UserResponseDto signup(userRequestDto)



### Example

```javascript
import TrakerApi from 'traker_api';

let apiInstance = new TrakerApi.UserControllerApi();
let userRequestDto = new TrakerApi.UserRequestDto(); // UserRequestDto | 
apiInstance.signup(userRequestDto).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userRequestDto** | [**UserRequestDto**](UserRequestDto.md)|  | 

### Return type

[**UserResponseDto**](UserResponseDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

