# TrakerApi.RoutesControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteRoute**](RoutesControllerApi.md#deleteRoute) | **DELETE** /api/route/{routeId} | 
[**getRoute**](RoutesControllerApi.md#getRoute) | **GET** /api/route/{routeId} | 
[**getVehicleRoutes**](RoutesControllerApi.md#getVehicleRoutes) | **GET** /api/route/vehicle/{vehicleId} | 



## deleteRoute

> deleteRoute(routeId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.RoutesControllerApi();
let routeId = 789; // Number | 
apiInstance.deleteRoute(routeId).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **routeId** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## getRoute

> RouteResponseDto getRoute(routeId)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.RoutesControllerApi();
let routeId = 789; // Number | 
apiInstance.getRoute(routeId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **routeId** | **Number**|  | 

### Return type

[**RouteResponseDto**](RouteResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getVehicleRoutes

> ListResponseRouteShortResponseDto getVehicleRoutes(vehicleId, opts)



### Example

```javascript
import TrakerApi from 'traker_api';
let defaultClient = TrakerApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer Authentication
let Bearer Authentication = defaultClient.authentications['Bearer Authentication'];
Bearer Authentication.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TrakerApi.RoutesControllerApi();
let vehicleId = 789; // Number | 
let opts = {
  'page': 0, // Number | 
  'size': 5, // Number | 
  'since': new Date("2013-10-20"), // Date | 
  'interval': new Date("2013-10-20") // Date | 
};
apiInstance.getVehicleRoutes(vehicleId, opts).then((data) => {
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
 **since** | **Date**|  | [optional] 
 **interval** | **Date**|  | [optional] 

### Return type

[**ListResponseRouteShortResponseDto**](ListResponseRouteShortResponseDto.md)

### Authorization

[Bearer Authentication](../README.md#Bearer Authentication)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

