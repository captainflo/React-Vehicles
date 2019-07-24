import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css'

class Header extends React.Component{
    renderLinks(){
        if (this.props.authenticated){
            return (
                <div>
                    <Link to="/signout">signout</Link>
                    <Link to="/feature">feature</Link>
                </div>
            )
        } else {
            return(<div>
                <Link to="/signup">sign up</Link>
                <Link to="/signin">sign in</Link>
            </div>)
        }
    }
    render(){
        return(
            <div>
                <Link to="/">Redux Auth</Link>
                {this.renderLinks()}
            </div>
        )
    }
}

function mapStateToPros(state) {
    return { authenticated: state.auth.authenticated };
  }

export default connect(mapStateToPros)(Header);
