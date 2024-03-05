import React from 'react';
import { compose, withProps } from "recompose"
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import gps from '../../images/location.png'

import s from './Google.module.scss';
import MapDirectionsRenderer from './MapDirectionRenderer';

const BasicMap = compose(
  withProps({
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={15}
    center={props.center}
    options={{
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      mapId:'d9aef60c4a75247b'
    }}
  >
    {props.places && (<>
      <Marker position={{ lat: props.places[0].latitude, lng:props.places[0].longitude }} title='Inicio' label='1' clickable />
      <MapDirectionsRenderer places={props.places} travelMode={window.google.maps.TravelMode.DRIVING} />
      <Marker position={{ lat: props.places[props.places.length - 1].latitude, lng:props.places[props.places.length - 1].longitude }} title='Final' label='2' clickable/>
    </>)}
    {props.ubication && (<Marker position={{ lat: props.ubication.latitude, lng:props.ubication.longitude }} icon={gps} />)}
  </GoogleMap>
);

class Maps extends React.Component {


  render() {
    const{ubication, places} = this.props;
    var center = {
      lat:0,
      lng:0
    }
    if(ubication != null){
      center = {
        lat: ubication.latitude,
        lng: ubication.longitude
      }
    }else if (places != null){
      center = {
        lat: places[0].latitude,
        lng: places[0].longitude
      }
    }
    return (
      <div>
        <div className={s.MapContainer}>
          <BasicMap
            center={center}
            places={places}
            ubication={ubication}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCv990kLR8GFB1gb_dwkH0zpYTX93lev_w"
            loadingElement={<div style={{ height: 'inherit', width: 'inherit' }} />}
            containerElement={<div style={{ height: 'inherit' }} />}
            mapElement={<div style={{ height: 'inherit' }} />}
          />
        </div>
      </div>
    );
  }
}

export default Maps;
