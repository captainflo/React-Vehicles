import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";

import normalizePhone from "./normalizePhone";

class UserEdit extends React.Component {
  onSubmit = (formProps) => {
    const id = this.props.auth._id;
    this.props.editUser(id, formProps, () => {
      this.props.history.push(`/user/${id}`);
    });
  };

  onDelete = () => {
    const id = this.props.auth._id;
    this.props.deleteUser(id, () => {
      this.props.history.push(`/`);
    });
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <div className="card">
          <h4 className="center">
            Edit <i className="fas fa-user-alt" />
          </h4>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="row">
              <div className="col s12 m6">
                <div className="input-field">
                  <i className="material-icons prefix">account_circle</i>
                  <Field
                    name="firstName"
                    id="firstName"
                    type="text"
                    component="input"
                    autoComplete="none"
                  />
                  <label htmlFor="firstName">First Name</label>
                </div>
              </div>

              <div className="col s12 m6">
                <div className="input-field">
                  <i className="material-icons prefix">account_circle</i>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    component="input"
                    autoComplete="none"
                  />
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                <div className="input-field">
                  <i className="material-icons prefix">email</i>
                  <Field
                    name="email"
                    id="email"
                    type="text"
                    component="input"
                    autoComplete="none"
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

              <div className="col s12 m6">
                <div className="input-field">
                  <i className="material-icons prefix">phone</i>
                  <Field
                    id="phone"
                    name="phone"
                    type="tel"
                    component="input"
                    autoComplete="none"
                    normalize={normalizePhone}
                  />
                  <label htmlFor="phone">Phone</label>
                </div>
              </div>
            </div>
            <button className="waves-effect waves-light btn">
              <i className="material-icons right">cloud</i>Edit
            </button>
          </form>
          <button
            onClick={this.onDelete}
            className="waves-effect waves-light btn"
          >
            <i className="material-icons right">cloud</i>Delete
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    errorMessage: state.auth.errorMessage,
    auth: state.auth.authenticated
  };
}

export default compose(
  connect(
    mapStateToPros,
    actions
  ),
  reduxForm({ form: "userEdit" })
)(UserEdit);
