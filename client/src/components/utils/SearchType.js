import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Autocomplete from 'react-google-autocomplete';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

class SearchCity extends React.Component {
  state = {
    city: '',
    selectCity: '',
    vehicle: '',
    invalidVehicle: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    // Validate city
    if (this.state.city === '') {
      this.setState({ selectCity: 'must select city' });
    } else {
      this.setState({ selectCity: '' });
    }

    // Validate vehicle
    if (this.state.vehicle === '') {
      this.setState({ invalidVehicle: 'must select vehicle' });
    } else {
      this.setState({ invalidVehicle: '' });
    }

    const form = {
      city: this.state.city,
      vehicle: this.state.vehicle,
    };

    if (this.state.city !== '' && this.state.vehicle !== '') {
      this.props.getAllVehicleByType(form);
      this.props.history.push(`/city/${form.city}`);
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        <form className="search-city" id="search-form">
          <div className="row">
            <div className="col m6 s12">
              <label>City</label>
              <Autocomplete
                onPlaceSelected={(place) => {
                  this.setState({ city: place.formatted_address });
                }}
                types={['(regions)']}
                componentRestrictions={{ country: 'us' }}
              />
              <span style={{ color: 'red' }}>{this.state.selectCity}</span>
            </div>

            <div className="col m6 s12 block-vehicle">
              <div className="row center">
                <div className="box-select-vehicle">
                  <div className="col m4">
                    <label>
                      <input
                        name="vehicle"
                        type="radio"
                        value="Car"
                        onChange={this.handleChange}
                      />
                      <span>
                        <i className="fas fa-car" /> Car
                      </span>
                    </label>
                    <span style={{ color: 'red' }}>
                      {this.state.invalidVehicle}
                    </span>
                  </div>
                  <div className="col m4">
                    <label>
                      <input
                        name="vehicle"
                        type="radio"
                        value="Boat"
                        onChange={this.handleChange}
                      />
                      <span>
                        <i className="fas fa-ship" /> Boat
                      </span>
                    </label>
                  </div>
                  <div className="col m4">
                    <label>
                      <input
                        name="vehicle"
                        type="radio"
                        value="Bike"
                        onChange={this.handleChange}
                      />
                      <span>
                        <i className="fas fa-motorcycle" /> Bike
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={this.onSubmit}
            className="waves-effect waves-light btn btn-color btn-search"
          >
            Search
          </button>
        </form>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default compose(
  withRouter,
  connect(mapStateToProps, actions)
)(SearchCity);
