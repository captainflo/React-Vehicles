import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import image from './marker.jpg';

const MapContainer = (props) => {
  const { vehicles } = props;
  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const [currentPosition, setCurrentPosition] = useState({});

  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  return (
    <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={currentPosition}>
      {vehicles.map((vehicle) => {
        const location = { lat: vehicle.lat, lng: vehicle.lng };
        return (
          <Marker
            key={vehicle.name}
            position={location}
            icon={{
              url: image,
              anchor: new window.google.maps.Point(16, 16),
              scaledSize: new window.google.maps.Size(32, 32),
            }}
            onClick={() => props.action(vehicle._id)}
          />
        );
      })}
    </GoogleMap>
  );
};
export default MapContainer;
