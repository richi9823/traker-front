import React from 'react';
import { Polyline } from "react-google-maps";

export default class MapDirectionsRenderer extends React.Component {
    state = {
      directions: [{lat:0, lng:0}],
      error: null
    };
  
    componentDidMount() {
      const { places } = this.props;
      const waypoints = places.map(p =>({
           lat: p.latitude, lng:p.longitude,

      }))


       this.setState({
         directions: waypoints
       });

      }
  
    render() {
      const { directions} = this.state;
      return <Polyline path={directions} 
      strokeColor="#0000FF"
      strokeOpacity={0.8}
      strokeWeight={2} />;
    }
  }