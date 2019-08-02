import React from 'react';
import { connect } from 'react-redux';

class Feature extends React.Component{
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

export default connect(mapStateToPros)(Feature);
