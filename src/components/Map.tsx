import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import { compose, withProps } from 'recompose';

export const GoogleMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.GOOGLE_MAP_KEY || null
    }&v=3.exp`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={1} defaultCenter={{ lat: 35.188074, lng: -40.62508 }}>
    {props.children}
  </GoogleMap>
));
