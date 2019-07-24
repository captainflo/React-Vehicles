import React from "react";
import Header from "./Header";
import { BrowserRouter, Route } from 'react-router-dom';

import Welcome from './Welcome';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Feature from './Feature';
import Signout from './auth/Signout'

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Route path='/' exact component={Welcome}/>
          <Route path='/signup'  component={Signup}/>
          <Route path='/feature'  component={Feature}/>
          <Route path="/signout" component={Signout}/>
          <Route path="/signin" component={Signin}/>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
