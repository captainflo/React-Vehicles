import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import image from './marker.jpg';

const MapContainer = (props) => {
  const { vehicles, city } = props;
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
    <div style={{ padding: 10 }}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={city}>
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
    </div>
  );
};
export default MapContainer;
