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

const BasicMap = compose(
  withProps({
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={15}
    center={{ lat: props.latitude, lng:props.longitude }}
    options={{
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      mapId:'d9aef60c4a75247b'
    }}
  >
    <Marker position={{ lat: props.latitude, lng:props.longitude }} icon={gps} />
  </GoogleMap>
);

class Maps extends React.Component {


  render() {
    const{latitude, longitude} = this.props;
    console.log(latitude, longitude)
    return (
      <div>
        <div className={s.MapContainer}>
          <BasicMap
            latitude={latitude}
            longitude={longitude}
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
