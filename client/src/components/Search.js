import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Autocomplete from "react-google-autocomplete";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class Search extends React.Component {
  state = {
    startDate: {},
    endDate: {},
    city: "",
    startHour: "",
    endHour: ""
  };

  onSubmit = (event) => {
    event.preventDefault();
    // Date Format
    const formatDateStart = this.state.startDate;
    const responseDateStart = moment(formatDateStart).format("L");

    const formatDateEnd = this.state.endDate;
    const responseDateEnd = moment(formatDateEnd).format("L");

    const form = {
      startDate: responseDateStart,
      endDate: responseDateEnd,
      city: this.state.city,
      startHour: this.state.startHour,
      endHour: this.state.endHour
    }

    // Date Validation
    const  startFinal = Date.parse(this.state.startDate);
    const  endFinal = Date.parse(this.state.endDate);
    if (this.state.city === "") {
      alert("must select city");
    }
    if(endFinal < startFinal){
      alert('wrong')
    } else {
      alert('good')
    }
    console.log(form);
  };

  handleType = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
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

  render() {
    return (
      <MuiThemeProvider>
        <form>
          <div className="row">
            <div className="col m6 s12">
              <div className=''>
                <label>City</label>
                <Autocomplete
                  onPlaceSelected={place => {
                    this.setState({ city: place.formatted_address });
                  }}
                  types={["(regions)"]}
                  componentRestrictions={{ country: "us" }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col m3 s12">
              <div className="Boxinput">
                <DatePicker
                  floatingLabelText="Pick up at"
                  hintText="hello"
                  value={this.state.startDate}
                  onChange={this.handleChangeStartDate}
                />
              </div>
            </div>
            <div className="col m3 s12">
              <div className="Boxinput">
                <SelectField
                  floatingLabelText="Start Hour"
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
                  hintText="hello"
                  value={this.state.endDate}
                  onChange={this.handleChangeEndDate}
                />
              </div>
            </div>
            <div className="col m3 s12">
              <div className="Boxinput">
                <SelectField
                  floatingLabelText="Start Hour"
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
          <button type="submit" onClick={this.onSubmit}>
              Here
            </button>
        </form>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default compose(connect(mapStateToProps))(Search);
