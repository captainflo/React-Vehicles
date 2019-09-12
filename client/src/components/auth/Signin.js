import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";
import "./Signin.css";

class Signin extends React.Component {
  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      this.props.history.push(`/feature`);
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form className='user-login' onSubmit={handleSubmit(this.onSubmit)}>
          <h4 className="center">Sign in <i className="fas fa-user-alt"></i></h4>
            <div className='row'>
              <div className='col m6 s12'>
                <div className="input-field">
                <div style={{color: 'red', marginLeft: '45px'}}>{this.props.errorMessage}</div>
                <i className="material-icons prefix">email</i>
                  <Field
                    name="email"
                    type="text"
                    component="input"
                    autoComplete="none"
                    placeholder="email"
                  />
              </div>
              </div>
              <div className='col m6 s12'>
              <div className="input-field">
              <i className="material-icons prefix">lock</i>
                <Field
                  name="password"
                  type="password"
                  component="input"
                  autoComplete="none"
                  placeholder="password"
                />
            </div>
              </div>
            </div>
          
            
            <div className='row center'>
              <div className='col m12 s12'>
                <button className="waves-effect waves-light btn btn-color">
                  <i className="material-icons right">cloud</i>Sign In
                </button>
              </div>
            </div>
          </form>
          <p className='center'>- OR -</p>
          <div className='row center'>
            <div className='col m6 s12'>
            <li style={{listStyle:'none', paddingBottom: '10px'}}><a href="/auth/google" className="waves-effect waves-light btn social google">
            <i className="fab fa-google"></i>google</a></li>
            <li style={{listStyle:'none', paddingBottom: '10px'}}><a href="/auth/linkedin" className="waves-effect waves-light btn social linkedin">
            <i className="fab fa-linkedin"></i>linkedin</a></li>
            </div>
            <div className='col m6 s12'>
            <li style={{listStyle:'none', paddingBottom: '10px'}}><a href='/auth/facebook'className="waves-effect waves-light btn social facebook">
            <i className="fab fa-facebook"></i>facebook</a></li>
          
            <li style={{listStyle:'none', paddingBottom: '10px'}}><a href="/auth/instagram" className="waves-effect waves-light btn social instagram">
            <i className="fab fa-instagram"></i>instagram</a></li>
            </div>
          </div>
        </div>
      );
    }
  }

function mapStateToPros(state) {
  return {
    errorMessage: state.auth.errorMessage,
    auth: state.auth,
    authReducer: state.authReducer
  };
}

export default compose(
  connect(
    mapStateToPros,
    actions,
  ),
  reduxForm({ form: "signin" })
)(Signin);
