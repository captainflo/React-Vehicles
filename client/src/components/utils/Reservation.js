import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import DatePicker from "material-ui/DatePicker";
import * as actions from "../actions";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import M from "materialize-css/dist/js/materialize.min.js";
import moment from "moment";
import DatePickers from "../utils/DatePickers";

class Reservation extends React.Component {
  state = {
    newprice: this.props.vehicle[0].price,
    addCalandar: false,
    startDate: {},
    endDate: {},
    invalidDate: "",
    count: 0,
    max: "",
    className: 'col m12'
  };

  componentDidMount() {
    const elemSelect = document.querySelectorAll("select");
    M.FormSelect.init(elemSelect, {});
  }

 

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
  

    var date1 = moment(formatDateStart,'seconds' );
    var date2 = moment(formatDateEnd, 'seconds');
    var diff = date2.diff(date1, 'seconds');
    const diffDay = diff / 86400;
    console.log(diffDay);
    const finalPrice = this.state.newprice * diffDay
    console.log(finalPrice);

    
    
    // if start date > end date
    if (startFinal > endFinal) {
      this.setState({
        invalidDate: "drop off date must be superior than pick up date"
      });
    } else {
      this.setState({ invalidDate: "" });
    }
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

  increment(event) {
    event.preventDefault();
    if (this.state.count < 10) {
      this.setState({
        count: this.state.count + 1
      });
    } else {
      this.setState({
        max: "Max 10 passenger"
      });
    }
  }

  decrement(event) {
    event.preventDefault();
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1
      });
    }
  }

  addCalandar = () => this.setState({ addCalandar: true, className: 'col m6' });
  removeCalandar = () => this.setState({ addCalandar: false, className: 'col m12' });

  handlePrice = (event, index, value) => this.setState({ newprice: value });

  render() {
    if (!this.props.vehicle.length > 0) {
      return (
        <div style={{ marginTop: "10%" }} className="center">
          <p>Loading...</p>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <h4>Reservation</h4>
        <div className="form-price">
          <MuiThemeProvider>
            <form>
              <div className="row">
                <div className="col 2">
                  <span className="price-show-vehicle">
                    <i className="fas fa-dollar-sign"></i>
                    {this.state.newprice || this.props.vehicle[0].price}
                  </span>
                </div>
                <div className="col 10">
                  <div className="Boxinput">
                    <SelectField
                      value={this.state.newprice}
                      onChange={this.handlePrice}
                    >
                      <MenuItem
                        disabled
                        selected
                        label="Select"
                        primaryText="Select"
                      />
                      <MenuItem
                        value={this.props.vehicle[0].price}
                        onClick={this.removeCalandar}
                        label="Half Day"
                        primaryText="Half Day"
                      />
                      <MenuItem
                        value={this.props.vehicle[0].price * 2}
                        onClick={this.addCalandar}
                        label="Full Day"
                        primaryText="Full Day"
                      />
                    </SelectField>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className={this.state.className}> 
                  <div className="Boxinput box-date-reservation">
                  <DatePickers/>
                  </div>
                </div>
                {this.state.addCalandar && (
                  <div className="col m6">
                    <div className="Boxinput box-date-reservation">
                      <DatePicker
                        floatingLabelText={
                          <i class="material-icons">date_range</i>
                        }
                        value={this.state.endDate}
                        onChange={this.handleChangeEndDate}
                      />
                    </div>
                  </div>
                )}
                <div style={{ color: "red" }}>{this.state.invalidDate}</div>
              </div>
              <div className='center'> 
                <div className="counter">
                    <button
                    className="btn-floating waves-effect waves-light color-web"
                    onClick={e => this.decrement(e)}
                    >
                    <i class="material-icons">remove</i>
                    </button>
                    <span>
                    {this.state.count} <br></br> Passengers
                    </span>
                    <button
                    className="btn-floating waves-effect waves-light color-web"
                    onClick={e => this.increment(e)}
                    >
                    <i class="material-icons">add</i>
                    </button>
                </div>
              </div>
              <hr></hr>
              <button
                onClick={this.onSubmit}
                class="btn waves-effect waves-light color-web"
              >
                Request a Book
              </button>
              <div className='line'>
                 - Or -
              </div>
              <button
                class=" waves-effect waves-light color-web-owner"
              >
                Message Owner
              </button>
            </form>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    vehicle: state.vehicles,
    user: state.auth.user
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(Reservation);
