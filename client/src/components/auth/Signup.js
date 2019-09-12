import React from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";

class Signup extends React.Component {
  state = {
    errorPassword: "",
    validPassword: "",
    passwordConfirm: "",
    errorEmail: "",
  };
  
  handleChange = event => {
    this.setState({ passwordConfirm: event.target.value });
  };

  onSubmit = (formProps, dispatch) => {

    // Validate Email
    const email = formProps.email
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkEmail = re.test(email)
    // Validate Password
    const password = formProps.password
    const pass = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
    const checkPassword = pass.test(password)
    
    if (checkPassword){
      this.setState({validPassword: ""})
    } else{
      this.setState({validPassword: "must contains one lowercase characters, one uppercase characters, one number, least 6 characters and maximum of 20"})
    }

    if (checkEmail){
      this.setState({ errorEmail: ""});
    } else {
      this.setState({
        errorEmail: "Email is invalid"
      });
    }
      
    if (formProps.password === this.state.passwordConfirm) {
        this.setState({ errorPassword: ""});
    } else {
        this.setState({
          errorPassword: "The two password are not the same"
        });
    }
    
    if(checkPassword  === true && checkEmail === true && formProps.password === this.state.passwordConfirm){
      this.props.signup(formProps, () => {
        this.props.history.push("/feature");
      });
    }
  };

  render() {
    const { handleSubmit } = this.props;
  
    return (
      <div>
        <form className='user-login' onSubmit={handleSubmit(this.onSubmit)}>
          <h4 className="center">
            Sign Up <i className="fas fa-user-plus" />
          </h4>
          <div className="input-field">
            <div style={{color: 'red', marginLeft: '45px'}}>{this.props.errorMessage}</div>
            <div style={{color: 'red', marginLeft: '45px'}}>{this.state.errorEmail}</div>
            <i className="material-icons prefix">email</i>
            <Field
              name="email"
              type="text"
              component="input"
              autoComplete="none"
              placeholder="email"
              required
            />
          </div>

          <div className="input-field">
            <div style={{color: 'red', marginLeft: '45px'}}>{this.state.validPassword}</div>
            <i className="material-icons prefix">lock</i>
            <Field
              name="password"
              type="text"
              component="input"
              autoComplete="none"
              placeholder="password"
            />
          </div>

          <div className="input-field">
            <div style={{color: 'red', marginLeft: '45px'}}>{this.state.errorPassword}</div>
            <i className="material-icons prefix">lock</i>
            <input
              name="passwordConfirm"
              type="text"
              component="input"
              autoComplete="none"
              placeholder="password Confirm"
              onChange={this.handleChange}
            />
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
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(
    mapStateToPros,
    actions
  ),
  reduxForm({ form: "signup", })
)(Signup);
