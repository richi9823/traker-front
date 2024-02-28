# TrakerApi.AlertResponseDto

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** |  | [optional] 
**name** | **String** |  | [optional] 
**silenced** | **Boolean** |  | [optional] 
**type** | **String** |  | [optional] 
**vehicles** | [**[VehicleShortResponseDto]**](VehicleShortResponseDto.md) |  | [optional] 
**arrival** | [**AlertArrivalResponseDto**](AlertArrivalResponseDto.md) |  | [optional] 
**distance** | [**AlertDistanceResponseDto**](AlertDistanceResponseDto.md) |  | [optional] 
**speed** | [**AlertSpeedResponseDto**](AlertSpeedResponseDto.md) |  | [optional] 
**createdDate** | **Date** |  | [optional] 
**modifiedDate** | **Date** |  | [optional] 



## Enum: TypeEnum


* `SPEED` (value: `"SPEED"`)

* `ARRIVAL` (value: `"ARRIVAL"`)

* `DISTANCE` (value: `"DISTANCE"`)

* `DISTANCE_ROUTE` (value: `"DISTANCE_ROUTE"`)




