import React from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";

class Signup extends React.Component {
  state = {
    errorPassword: "",
    passwordConfirm: "",
    errorEmail: "",
  };
  
  handleChange = event => {
    this.setState({ passwordConfirm: event.target.value });
  };

  onSubmit = formProps => {
    const email = formProps.email
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkEmail = re.test(email)
    if (checkEmail){
      this.setState({ errorEmail: ""});
      if (formProps.password === this.state.passwordConfirm) {
        this.setState({ errorPassword: ""});
        this.props.signup(formProps, () => {
          this.props.history.push("/feature");
        });
      } else {
        this.setState({
          errorPassword: "The two password are not the same"
        });
      }
    } else {
      this.setState({
        errorEmail: "Email is invalid"
      });
    }
  };

  render() {
    const { handleSubmit } = this.props;
  
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
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
            />
          </div>

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

          <div className="input-field">
            <div style={{color: 'red', marginLeft: '45px'}}>{this.state.errorPassword}</div>
            <i className="material-icons prefix">lock</i>
            <input
              name="passwordConfirm"
              type="password"
              component="input"
              autoComplete="none"
              placeholder="password Confirm"
              onChange={this.handleChange}
            />
          </div>
          
          <button className="waves-effect waves-light btn">
            <i className="material-icons right">cloud</i>Sign Up
          </button>
        </form>
        <a
          style={{ marginTop: "20px" }}
          href="/auth/google"
          className="waves-effect waves-light btn social google"
        >
          <i className="fab fa-google" /> Sign Up with google
        </a>
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
  reduxForm({ form: "signup" })
)(Signup);
