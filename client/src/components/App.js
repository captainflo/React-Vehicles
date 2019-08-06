import React from "react";
import Header from "./Header";
import { BrowserRouter, Route} from 'react-router-dom';
import * as actions from './actions'
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import './App.css';

import Welcome from './Welcome';
import Feature from './Feature';
import Signout from './auth/Signout'
import UserShow from "./user/UserShow";
import UserEdit from "./user/UserEdit";

class App extends React.Component {
  componentDidMount(){
    this.props.fetchUser();
    console.log(this.props.authenticated);
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

          {this.props.authenticated ?
          <div>
            <Route exact path='/feature' component={Feature}/>
            <Route exact path="/user/:id" component={UserShow}/>
            <Route exact path='/user/edit/:id' component={UserEdit}/>
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
