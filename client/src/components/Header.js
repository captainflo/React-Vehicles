import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css'

class Header extends React.Component{
    renderLinks(){
        if (this.props.authenticated || this.props.authReducer){
            return (
                <div>
                    {!this.props.authReducer?<Link to="/signout">signout</Link>: <a href="/api/logout">signout</a>}
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
    return { authenticated: state.auth.authenticated, authReducer: state.authReducer };
  }

export default connect(mapStateToPros)(Header);
