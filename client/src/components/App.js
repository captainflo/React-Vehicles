import React from "react";
import Header from "./Header";
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from './actions'
import { connect } from 'react-redux';

import Welcome from './Welcome';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Feature from './Feature';
import Signout from './auth/Signout'

class App extends React.Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Route exact path='/' component={Welcome}/>
          <Route path='/feature'  component={Feature}/>
          <Route path="/signout" component={Signout}/>
          {!this.props.authenticated && !this.props.authReducer &&<Route path='/signup'  component={Signup}/>}
          {!this.props.authenticated && !this.props.authReducer && <Route  path="/signin" component={Signin}/>}
        </BrowserRouter>
        
      </div>
    );
  }
}

function mapStateToPros(state) {
  console.log(state)
  return { authenticated: state.auth.authenticated, authReducer: state.authReducer };
}

export default connect(mapStateToPros, actions)(App);
