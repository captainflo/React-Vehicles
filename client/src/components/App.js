import React from "react";
import Header from "./utils/Header";
import { BrowserRouter, Route} from 'react-router-dom';
import * as actions from './actions'
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import './App.css';

import Welcome from './page/Welcome';
import Signout from './auth/Signout'
import UserShow from "./user/UserShow";
import UserEdit from "./user/UserEdit";
import VehicleCreate from './vehicle/VehicleCreate';
import ShowSearch from "./page/ShowSearch";
import VehicleShow from "./vehicle/vehicleShow";
import InfoUser from "./user/InfoUser";
import ConfirmReservation from "./utils/ConfirmReservation";
import ConfirmVehicle from "./utils/ConfirmVehicle";

class App extends React.Component {
  componentDidMount(){
    this.props.fetchUser();
    // Sidebar
    const elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Route exact path='/' component={Welcome}/>
          <Route path='/city/:city' component={ShowSearch}/>
          <Route path="/signout" component={Signout}/>
          <Route path="/vehicle/:id/" component={VehicleShow}/>
          <Route path="/user/info/:id/" component={InfoUser}/>

          {this.props.authenticated ?
          <div>
            <Route exact path="/user/:id" component={UserShow}/>
            <Route exact path="/user/:id/createVehicle" component={VehicleCreate}/>
            <Route exact path='/user/edit/:id' component={UserEdit}/>
            <Route exact path='/confirmation/payment' component={ConfirmReservation}/>
            <Route exact path='/confirmation/vehicle' component={ConfirmVehicle}/>
          </div> : ""}
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return { authenticated: state.auth.authenticated};
}

export default connect(mapStateToPros, actions)(App);
