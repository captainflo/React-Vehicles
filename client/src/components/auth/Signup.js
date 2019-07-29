import React from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";

class Signup extends React.Component {
  state = {
    errorPassword: "",
    passwordConfirm: ""
  };

  handleChange = event => {
    this.setState({ passwordConfirm: event.target.value });
  };

  onSubmit = formProps => {
    if (formProps.password === this.state.passwordConfirm) {
      this.setState({ errorPassword: "" });
      this.props.signup(formProps, () => {
        this.props.history.push("/feature");
      });
    } else {
      this.setState({
        errorPassword: "Password is not identique as Password Confirm"
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
