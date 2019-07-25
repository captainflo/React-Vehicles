import React from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";

class Signin extends React.Component {

  onSubmit = formProps => {
      this.props.signin(formProps, () => {
        this.props.history.push("/feature");
      });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label>Email</label>
            <Field
              name="email"
              type="text"
              component="input"
              autoComplete="none"
            />
          </fieldset>
          <fieldset>
            <label>password</label>
            <Field
              name="password"
              type="password"
              component="input"
              autoComplete="none"
            />
          </fieldset>
          <div>{this.props.errorMessage}</div>
          <button>Sign In!</button>
        </form>
        <a href="/auth/google">Login with Google</a>
        <Link to="/signup">sign up</Link>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return { errorMessage: state.auth.errorMessage , auth: state.auth, authReducer: state.authReducer};
}

export default compose(
  connect(
    mapStateToPros,
    actions
  ),
  reduxForm({ form: "signin" })
)(Signin);
