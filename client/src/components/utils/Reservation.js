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


class Reservation extends React.Component {
  state = {
    newprice: this.props.vehicle[0].price,
    finalPrice: '',
    addCalandar: false,
    startDate: new Date(),
    infoStartDate: '',
    infoEndDate: '',
    endDate: new Date(),
    invalidDate: "",
    count: 0,
    max: "",
    className: 'col m12',
    contractDate: "",
  };

  componentDidMount() {
    const elemSelect = document.querySelectorAll("select");
    M.FormSelect.init(elemSelect, {});
    const elemsModal = document.querySelectorAll('.modal');
    M.Modal.init(elemsModal,{});
  }

  onSubmit = event => {
    event.preventDefault();
    // Date Format
    const formatDateStart = this.state.startDate;
    const responseDateStart = moment(formatDateStart).format("L");
    this.setState({
      infoStartDate: responseDateStart
    });
    

    const formatDateEnd = this.state.endDate;
    const responseDateEnd = moment(formatDateEnd).format("L");
    this.setState({
      infoEndDate: responseDateEnd
    });
    const date1 = new Date(responseDateStart);
    const date2 = new Date(responseDateEnd);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const finaldiffDays = diffDays + 1
    const finalPrice = this.state.newprice * finaldiffDays
    this.setState({
      finalPrice: finalPrice
    });
    console.log(finalPrice)
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

  handleContractDateChange = (event, date) => {
    this.setState({
      contractDate: date
    });
  };

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
                  <DatePicker
                        floatingLabelText={
                          <i className="material-icons">date_range</i>
                        }
                        value={this.state.startDate}
                        onChange={this.handleChangeStartDate}
                        minDate={new Date()} 
                      />
                  </div>
                </div>
                {this.state.addCalandar && (
                  <div className="col m6">
                    <div className="Boxinput box-date-reservation">
                      <DatePicker
                        floatingLabelText={
                          <i className="material-icons">date_range</i>
                        }
                        value={this.state.endDate}
                        onChange={this.handleChangeEndDate}
                        minDate={new Date()} 
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
                    <i className="material-icons">remove</i>
                    </button>
                    <span>
                    {this.state.count} <br></br> Passengers
                    </span>
                    <button
                    className="btn-floating waves-effect waves-light color-web"
                    onClick={e => this.increment(e)}
                    >
                    <i className="material-icons">add</i>
                    </button>
                </div>
              </div>
              <hr></hr>
              <button
                onClick={this.onSubmit}
                href="#modalBook"
                className="btn waves-effect waves-light color-web modal-trigger"
              >
                Request a Book
              </button>
               
              <div className='line'>
                 - Or -
              </div>
              <button
                href="#modalMessage"
                className=" waves-effect waves-light color-web-owner modal-trigger"
              >
                Message Owner
              </button>
            </form>
          </MuiThemeProvider>
        </div>
      
        <div id="modalBook" className="modal">
          <div className="modal-content">
          <button className='modal-close right btn waves-effect waves-light btn-close-modal'><i className="fas fa-times"></i></button>
            <h4>Confirmation Book</h4>
            <p>You are in the last step of your booking before proced payment</p>
            <p><i className="material-icons">date_range</i> {this.state.infoStartDate} To <i className="material-icons">date_range</i> {this.state.infoEndDate}</p>
            <p><i className="material-icons">person</i> {this.state.count}</p>
            <p><i className="fas fa-dollar-sign"></i> {this.state.finalPrice}</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close btn waves-effect waves-light color-web">Payment</a>
          </div>
        </div>

        <div id="modalMessage" className="modal">
          <div className="modal-content">
          <button className='modal-close right btn waves-effect waves-light btn-close-modal'><i className="fas fa-times"></i></button>
            <h4>Message Owner</h4>
            <div className="row">
              <form className="col s12">
              <div className="row">
                  <div className="input-field col s6">
                    <i className="fas fa-user-alt prefix"></i>
                    <textarea id="icon_prefix" className="materialize-textarea"></textarea>
                    <label htmlFor="icon_prefix">First Name</label>
                  </div>
                  <div className="input-field col s6">
                    <i class="far fa-edit prefix"></i>
                    <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                    <label htmlFor="icon_prefix2">Type of message</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                  <i className="far fa-comment-dots prefix"></i>
                    <textarea id="icon_prefix3" className="materialize-textarea"></textarea>
                    <label htmlFor="icon_prefix3">Message</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close btn waves-effect waves-light color-web">Send Message</a>
          </div>
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
