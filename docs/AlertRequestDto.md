# TrakerApi.AlertRequestDto

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** |  | [optional] 
**silenced** | **Boolean** |  | 
**type** | **String** |  | 
**vehicles** | **[Number]** |  | [optional] 
**arrival** | [**AlertArrivalRequestDto**](AlertArrivalRequestDto.md) |  | [optional] 
**distance** | [**AlertDistanceRequestDto**](AlertDistanceRequestDto.md) |  | [optional] 
**speed** | [**AlertSpeedRequestDto**](AlertSpeedRequestDto.md) |  | [optional] 



## Enum: TypeEnum


* `SPEED` (value: `"SPEED"`)

* `ARRIVAL` (value: `"ARRIVAL"`)

* `DISTANCE` (value: `"DISTANCE"`)

* `DISTANCE_ROUTE` (value: `"DISTANCE_ROUTE"`)




