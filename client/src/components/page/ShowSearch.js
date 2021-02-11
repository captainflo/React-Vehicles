import React, { useEffect, useState } from 'react';
import MapContainerGoogle from '../utils/MapContainerGoogle';
import M from 'materialize-css/dist/js/materialize.min.js';
import * as actions from '../actions';
import SearchType from '../utils/SearchType';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as geolib from 'geolib';
import Geocode from 'react-geocode';
import config from '../../config/keys';
Geocode.setApiKey(config.googleMap);

const ShowSearch = (props) => {
  const [classCard, setClassCard] = useState('card-product');
  const [city, setCity] = useState({ lat: '', lng: '' });
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.vehicles);

  useEffect(() => {
    // collapsible
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {
      inDuration: 300,
    });
    dispatch(actions.getAllVehicleByCity(props.match.params.city));
    GetCity(props.match.params.city);
  }, [dispatch, props.match.params.city]);

  // This method will be sent to the child component
  const handler = (vehicleId) => {
    window.location = '#' + vehicleId;
    setClassCard(`card-product`);
    if (vehicleId) {
      setClassCard({ [vehicleId]: `select-marker` });
    }
  };

  // Convert city
  const GetCity = (city) => {
    Geocode.fromAddress(city).then(
      (response) => {
        const lat = response.results[0].geometry.location.lat;
        const lng = response.results[0].geometry.location.lng;
        setCity({ lat: lat, lng: lng });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  // Get distance between my search and vehicle around
  const getDistance = (vehicleLat, vehicleLng, array) => {
    const distance = geolib.getDistance(
      { latitude: city.lat, longitude: city.lng },
      { latitude: vehicleLat, longitude: vehicleLng }
    );
    const finalDistance = String(distance);
    const distanceInMile = geolib.convertDistance(finalDistance, 'mi');
    const distanceWithTwoDecimal = distanceInMile.toFixed(2);
    array.push(distanceWithTwoDecimal);
  };

  // Render Vehicles
  const renderListVehicle = () => {
    if (vehicles.length > 0) {
      return vehicles.map((vehicle) => {
        const DistanceFromMySearch = [];
        const latVehicle = vehicle.lat;
        const lngVehicle = vehicle.lng;
        getDistance(latVehicle, lngVehicle, DistanceFromMySearch);
        if (vehicle.city === props.match.params.city) {
          return (
            <Link key={vehicle._id} to={'/vehicle/' + vehicle._id}>
              <div
                id={vehicle._id}
                className={'card-product' + ' ' + classCard[vehicle._id]}
              >
                <img src={vehicle.image} alt="background" />
                <div className="card-product-infos">
                  <h2>{vehicle.name}</h2>
                  <p>
                    <i className="fas fa-building"></i> {vehicle.city}
                  </p>
                  <p>
                    <i className="fas fa-dollar-sign"></i> {vehicle.price} /Half
                    Day
                  </p>
                  <p>
                    Your are {DistanceFromMySearch} Miles from{' '}
                    {props.match.params.city}
                  </p>
                </div>
              </div>
            </Link>
          );
        }
      });
    } else {
      return <div>Nothing found!</div>;
    }
  };

  const renderAroundListVehicle = () => {
    if (vehicles.length > 0) {
      return vehicles.map((vehicle) => {
        const DistanceFromMySearch = [];
        const latVehicle = vehicle.lat;
        const lngVehicle = vehicle.lng;
        getDistance(latVehicle, lngVehicle, DistanceFromMySearch);
        if (DistanceFromMySearch < 30) {
          if (vehicle.city !== props.match.params.city) {
            return (
              <Link key={vehicle._id} to={'/vehicle/' + vehicle._id}>
                <div
                  id={vehicle._id}
                  className={'card-product' + ' ' + classCard[vehicle._id]}
                >
                  <img src={vehicle.image} alt="background" />
                  <div className="card-product-infos">
                    <h2>{vehicle.name}</h2>
                    <p>
                      <i className="fas fa-building"></i> {vehicle.city}
                    </p>
                    <p>
                      <i className="fas fa-dollar-sign"></i> {vehicle.price}{' '}
                      /Half Day
                    </p>
                    <p>
                      Your are {DistanceFromMySearch} Miles from{' '}
                      {props.match.params.city}
                    </p>
                  </div>
                </div>
              </Link>
            );
          }
        }
      });
    } else {
      return <div>Nothing found!</div>;
    }
  };

  return (
    <div className="search-show">
      <div className="row">
        <div className="col m6 s12 search-filter">
          <ul className="collapsible">
            <li>
              <div className="collapsible-header">
                Search{' '}
                <i style={{ fontSize: '20px' }} className="material-icons">
                  search
                </i>
              </div>
              <div className="collapsible-body">
                <SearchType />
              </div>
            </li>
          </ul>
          <div className="list-vehicle">
            {renderListVehicle()}
            <h5 style={{ paddingLeft: '10px' }}>
              Around {props.match.params.city} (30 Miles)
            </h5>
            {renderAroundListVehicle()}
          </div>
        </div>
        <div className="col m6 s12">
          {vehicles.length > 0 && (
            <MapContainerGoogle vehicles={vehicles} action={handler} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowSearch;
