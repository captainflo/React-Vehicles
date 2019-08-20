import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Autocomplete from "react-google-autocomplete";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import API from './API';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
  state = {
    startDate: {},
    endDate: {},
    city: "",
    startHour: "",
    endHour: "",
    vehicle: "",
    selectCity: "",
    invalidDate: "",
    invalidTime: "",
    invalidVehicle: ""
  };

  onSubmit = event => {
    event.preventDefault();
    // Date Format
    const formatDateStart = this.state.startDate;
    const responseDateStart = moment(formatDateStart).format("L");

    const formatDateEnd = this.state.endDate;
    const responseDateEnd = moment(formatDateEnd).format("L");

    // Date Validation
    const startFinal = Date.parse(this.state.startDate);
    const endFinal = Date.parse(this.state.endDate);

    // Validate city
    if (this.state.city === ""){
      this.setState({ selectCity: "must select city" });
    } else {
      this.setState({ selectCity: "" });
    }

    // if start date > end date
    if(startFinal >endFinal){
      this.setState({ invalidDate: "drop off date must be superior than pick up date" });
    } else {
      this.setState({ invalidDate: "" });
    }

    // Validate hours
    if (this.state.startHour === ""|| this.state.endHour === "") {
      this.setState({ invalidTime: "must select hours" });
    } else {
      this.setState({ invalidTime: "" });
    }

    // Validate vehicle
    if (this.state.vehicle === "") {
      this.setState({ invalidVehicle: "must select vehicle" });
    } else {
      this.setState({ invalidVehicle: "" });
    }
    
    const form = {
      startDate: responseDateStart,
      endDate: responseDateEnd,
      city: this.state.city,
      startHour: this.state.startHour,
      endHour: this.state.endHour,
      vehicle: this.state.vehicle
    };
    console.log(form);
    const city = form.city 

    if(startFinal < endFinal && this.state.city !== "" && this.state.startHour !== "" && this.state.endHour !== "" && this.state.vehicle !== ""){  
      API.SearchVehicle(city)
      this.props.history.push(`/city/${city}`);
    }

  };

  handleType = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeStartDate = (event, date) => {
    this.setState({
      startDate: date
    });
  };

  handleChangeEndDate = (event, date) => {
    this.setState({
      endDate: date
    });
  };

  handleChangeStartHour = (event, index, value) =>
    this.setState({ startHour: value });

  handleChangeEndHour = (event, index, value) =>
    this.setState({ endHour: value });

  handleChangeVehicle(event) {
    this.setState({
      vehicle: event.target.value
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <form id="search-form">
          <div className="row">
            <div className="col m6 s12">
                <label>City</label>
                <Autocomplete
                  onPlaceSelected={place => {
                    this.setState({ city: place.formatted_address });
                  }}
                  types={["(regions)"]}
                  componentRestrictions={{ country: "us" }}
                />
                <span style={{color: 'red'}}>{this.state.selectCity}</span>
            </div>
            <div className="col m6 s12 block-vehicle">
              <div className="row center">
                <div className="col m4">
                  <label>
                    <input
                      name="vehicle"
                      type="radio"
                      value="Car"
                      onChange={e => this.handleChangeVehicle(e)}
                    />
                    <span>
                      <i className="fas fa-car" /> Car
                    </span>
                  </label>
                  <span style={{color: 'red'}}>{this.state.invalidVehicle}</span>
                </div>
                <div className="col m4">
                  <label>
                    <input
                      name="vehicle"
                      type="radio"
                      value="Boat"
                      onChange={e => this.handleChangeVehicle(e)}
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
                      onChange={e => this.handleChangeVehicle(e)}
                    />
                    <span>
                      <i className="fas fa-motorcycle" /> Bike
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col m3 s12">
              <div className="Boxinput">
                <DatePicker
                  floatingLabelText="Pick up at"
                  value={this.state.startDate}
                  onChange={this.handleChangeStartDate}
                />
              </div>
            </div>
            <div className="col m3 s12">
              <div className="Boxinput">
                <SelectField
                  className='color-field'
                  floatingLabelText="Start Time"
                  value={this.state.startHour}
                  onChange={this.handleChangeStartHour}
                >
                  <MenuItem
                    value={"Morning"}
                    label="5 am - 12 pm"
                    primaryText="Morning"
                  />
                  <MenuItem
                    value={"Afternoon"}
                    label="12 pm - 5 pm"
                    primaryText="Afternoon"
                  />
                  <MenuItem
                    value={"Evening"}
                    label="5 pm - 9 pm"
                    primaryText="Evening"
                  />
                  <MenuItem
                    value={"Night"}
                    label="9 pm - 5 am"
                    primaryText="Night"
                  />
                </SelectField>
              </div>
            </div>
            <div className="col m3 s12">
              <div className="Boxinput">
                <DatePicker
                  floatingLabelText="drop off at"
                  value={this.state.endDate}
                  onChange={this.handleChangeEndDate}
                />
              </div>
            </div>
            <div className="col m3 s12">
              <div className="Boxinput">
                <SelectField
                  className='color-field'
                  floatingLabelText="Return Time"
                  value={this.state.endHour}
                  onChange={this.handleChangeEndHour}
                >
                  <MenuItem
                    value={"Morning"}
                    label="5 am - 12 pm"
                    primaryText="Morning"
                  />
                  <MenuItem
                    value={"Afternoon"}
                    label="12 pm - 5 pm"
                    primaryText="Afternoon"
                  />
                  <MenuItem
                    value={"Evening"}
                    label="5 pm - 9 pm"
                    primaryText="Evening"
                  />
                  <MenuItem
                    value={"Night"}
                    label="9 pm - 5 am"
                    primaryText="Night"
                  />
                </SelectField>
              </div>
            </div>
          </div>
          <div style={{color: 'red'}}>{this.state.invalidDate}</div>
          <div style={{color: 'red'}}>{this.state.invalidTime}</div>
          <button onClick={this.onSubmit} className="waves-effect waves-light btn-small">Search</button>
        </form>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default compose(withRouter,connect(mapStateToProps))(Search);
