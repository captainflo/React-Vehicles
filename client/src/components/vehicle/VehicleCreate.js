import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Autocomplete from 'react-google-autocomplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import * as actions from '../actions';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP);

class VehicleCreate extends React.Component {
  state = {
    city: '',
    vehicle: '',
    name: '',
    address: '',
    price: '',
    profile_pic: '',
    selectCity: '',
    selectAddress: '',
    invalidVehicle: '',
    invalidPrice: '',
    invalidImage: '',
    invalidName: '',
    picOk: null,
    lat: '',
    lng: ''
  };

  onSubmit = event => {
    event.preventDefault();
    console.log(this.state.vehicle);
    // Validate city
    if (this.state.city === '') {
      this.setState({ selectCity: 'must select city' });
    } else {
      this.setState({ selectCity: '' });
    }

    // Validate Address
    if (this.state.address === '') {
      this.setState({ selectAddress: 'must select Address' });
    } else {
      this.setState({ selectAddress: '' });
    }

    // Validate type vehicle
    if (this.state.vehicle === '') {
      this.setState({ invalidVehicle: 'must select vehicle' });
    } else {
      this.setState({ invalidVehicle: '' });
    }

    // Validate Price
    if (this.state.price === '') {
      this.setState({ invalidPrice: 'must enter Price' });
    } else {
      this.setState({ invalidPrice: '' });
    }

    // Validate Name
    if (this.state.name === '') {
      this.setState({ invalidName: 'must enter Name vehicle' });
    } else {
      this.setState({ invalidName: '' });
    }

    // Validate Image
    if (this.state.profile_pic === '') {
      this.setState({ invalidImage: 'must upload Image' });
    } else {
      this.setState({ invalidImage: '' });
    }

    // Get latidude & longitude from address and save it.
    Geocode.fromAddress(this.state.address).then(
      response => {
        let { lat, lng } = response.results[0].geometry.location;
        this.setState({ lat: lat, lng: lng });

        const form = {
          city: this.state.city,
          type: this.state.vehicle,
          name: this.state.name,
          image: this.state.profile_pic,
          address: this.state.address,
          lat: this.state.lat,
          lng: this.state.lng,
          price: this.state.price
        };
        console.log(form);

        if (
          form.price !== '' &&
          form.city !== '' &&
          form.type !== '' &&
          form.name !== '' &&
          form.image !== '' &&
          form.address !== ''
        ) {
          const id = this.props.auth._id;
          this.props.createVehicle(id, form, () => {
            this.props.history.push(`/confirmation/vehicle`);
          });
        }
      },
      error => {
        console.error(error);
      }
    );
  };

  handleType = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeVehicle = (event, index, value) =>
    this.setState({ vehicle: value });

  showWidget = event => {
    event.preventDefault();
    window.cloudinary.openUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY,
        uploadPreset: 'rtvojstm',
        folder: 'vehicle',
        sources: ['local', 'url', 'instagram']
      },
      (error, result) => {
        if (result.event === 'success') {
          //if (result && result.event === "success")
          this.setState({ picOk: true });
          this.setState({ profile_pic: result.info.url });
          console.log(result.info.url);
        }
      }
    );
  };

  render() {
    return (
      <div className="container">
        <h4 style={{ color: '#f4f4f4' }} className="center">
          Create your vehicle
        </h4>
        <MuiThemeProvider>
          <form className="box-create-vehicle" id="search-form">
            <div className="row">
              <div className="col m6 s12">
                <div className="Boxinput">
                  <TextField
                    name="name"
                    floatingLabelText="Name"
                    onChange={this.handleType}
                    autoComplete="off"
                  />
                  <span style={{ color: 'red' }}>{this.state.invalidName}</span>
                </div>
              </div>
              <div className="col m6 s12">
                <div className="Boxinput">
                  <SelectField
                    className="color-field"
                    floatingLabelText="Vehicle Type"
                    value={this.state.vehicle}
                    onChange={this.handleChangeVehicle}
                  >
                    <MenuItem value={'Car'} label="Car" primaryText="Car" />
                    <MenuItem value={'Boat'} label="Boat" primaryText="Boat" />
                    <MenuItem value={'Bike'} label="Bike" primaryText="Bike" />
                  </SelectField>
                  <span style={{ color: 'red' }}>
                    {this.state.invalidVehicle}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m6 s12">
                <label>Address</label>
                <Autocomplete
                  onPlaceSelected={place => {
                    this.setState({ address: place.formatted_address });
                  }}
                  types={['address']}
                  componentRestrictions={{ country: 'us' }}
                />
                <span style={{ color: 'red' }}>{this.state.selectAddress}</span>
              </div>
              <div className="col m6 s12">
                <label>City</label>
                <Autocomplete
                  onPlaceSelected={place => {
                    this.setState({ city: place.formatted_address });
                  }}
                  types={['(regions)']}
                  componentRestrictions={{ country: 'us' }}
                />
                <span style={{ color: 'red' }}>{this.state.selectCity}</span>
              </div>
              <div className="row">
                <div className="col m6 s12">
                  <div className="Boxinput">
                    <TextField
                      name="price"
                      floatingLabelText="Price Per Half Day"
                      onChange={this.handleType}
                      autoComplete="off"
                      type="number"
                    />
                    <span style={{ color: 'red' }}>
                      {this.state.invalidPrice}
                    </span>
                  </div>
                </div>
                <div className="col m6 s12">
                  <button onClick={this.showWidget} className="btn-picture">
                    <i className="material-icons right">add_a_photo</i>
                  </button>{' '}
                  Picture{' '}
                  {this.state.picOk && <i className="far fa-check-square"></i>}
                  <span style={{ color: 'red' }}>
                    {this.state.invalidImage}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={this.onSubmit}
              className="waves-effect waves-light btn btn-color"
            >
              Create Vehicle
            </button>
          </form>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default compose(connect(mapStateToProps, actions))(VehicleCreate);
