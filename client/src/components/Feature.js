import React from 'react';
import { connect } from 'react-redux';
import * as actions from "./actions";

class Feature extends React.Component{
    componentDidMount(){
        this.props.fetchUser();
      }
    render(){
        return(
            <div>
                feature
            </div>
        )
    }
}

function mapStateToPros(state) {
    console.log(state)
    return { authenticated: state.auth.authenticated};
  }

export default connect(mapStateToPros, actions)(Feature);
