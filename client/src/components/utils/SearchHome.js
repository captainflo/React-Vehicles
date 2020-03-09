import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Autocomplete from 'react-google-autocomplete';
import API from './API';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

class SearchHome extends React.Component {
  state = {
    city: '',
    selectCity: ''
  };

  onSubmit = event => {
    event.preventDefault();

    // Validate city
    if (this.state.city === '') {
      this.setState({ selectCity: 'must select city' });
    } else {
      this.setState({ selectCity: '' });
    }

    const form = {
      city: this.state.city,
      vehicle: this.state.vehicle
    };
    const city = form.city;

    if (this.state.city !== '') {
      API.SearchVehicle(city);
      this.props.history.push(`/city/${city}`);
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        <form className="search-city" id="search-form">
          <div className="row">
            <div className="col m12 s12">
              <div className="box-search-home">
                <label>City</label>
                <Autocomplete
                  onPlaceSelected={place => {
                    this.setState({ city: place.formatted_address });
                  }}
                  types={['(regions)']}
                  componentRestrictions={{ country: 'us' }}
                />
              </div>

              <button
                style={{ marginTop: '32px' }}
                onClick={this.onSubmit}
                className="waves-effect waves-light btn btn-color btn-search right"
              >
                Search
              </button>
              <span style={{ color: 'red' }}>{this.state.selectCity}</span>
            </div>
          </div>
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
)(SearchHome);
