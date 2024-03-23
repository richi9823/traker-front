# TrakerApi.AssetControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAsset**](AssetControllerApi.md#getAsset) | **GET** /api/asset/{assetId} | 



## getAsset

> Blob getAsset(assetId)



### Example

```javascript
import TrakerApi from 'traker_api';

let apiInstance = new TrakerApi.AssetControllerApi();
let assetId = "assetId_example"; // String | 
apiInstance.getAsset(assetId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **assetId** | **String**|  | 

### Return type

**Blob**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/octet-stream

