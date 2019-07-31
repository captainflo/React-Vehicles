import React from "react";
import Header from "./Header";
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from './actions'
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import './App.css';

import Welcome from './Welcome';
import Feature from './Feature';
import Signout from './auth/Signout'
import UserShow from "./user/UserShow";

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
          <Route path="/signout" component={Signout}/>

          {this.props.authenticated || this.props.authReducer ?
          <div>
            <Route exact path="/user" component={UserShow}/>
            <Route exact path='/feature' component={Feature}/>
          </div> : ""}

        </BrowserRouter>
        
      </div>
    );
  }
}

function mapStateToPros(state) {
  return { authenticated: state.auth.authenticated, authReducer: state.authReducer };
}

export default connect(mapStateToPros, actions)(App);
