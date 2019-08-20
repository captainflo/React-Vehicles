import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";
import { Modal } from "react-materialize";
import config from '../../config/keys';
import API from '../utils/API';

import normalizePhone from "./normalizePhone";

class UserEdit extends React.Component {
  state = {
    errorEmail: '',
    validPassword: '',
    avatar: '',
    picOk:'',
  }

  onSubmit = (formProps) => {
    const id = this.props.auth._id;
    // Validate Email
    const email = formProps.email
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkEmail = re.test(email)

    if (checkEmail){
      this.setState({ errorEmail: ""});
    } else {
      this.setState({
        errorEmail: "Email is invalid"
      });
    }
    if (email === undefined){
      this.setState({ errorEmail: ""});
    } 

    // Validate Password
    const password = formProps.password
    const pass = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
    const checkPassword = pass.test(password)
    
    if (checkPassword){
      this.setState({validPassword: ""})
    } else{
      this.setState({validPassword: "must contains one lowercase characters, one uppercase characters, one number, least 6 characters and maximum of 20"})
    }

    if (password === undefined){
      this.setState({ validPassword: ""});
    } 


      const body =  {
        avatar: this.state.avatar
      } 
     
    if((checkEmail === true || email === undefined) && (checkPassword === true || password === undefined) ){
      if(this.state.avatar !== ''){
        API.uploadImage(id, body);
      }
      this.props.editUser(id, formProps, () => {
        this.props.history.push(`/user/${id}`);
      });
    }    
  };

  showWidget = (event) => {
    event.preventDefault();
    window.cloudinary.openUploadWidget({
        cloudName: config.cloudinaryClientName,
        uploadPreset: "rtvojstm",
        folder: "vehicle",
        sources: ['local', 'url', 'instagram']
    },
        (error, result) => {

            if (result.event === "success") { //if (result && result.event === "success")
                this.setState({ picOk: true })
                this.setState({ avatar: result.info.url })
            };
        }
    )
  } 

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
                    name='email'
                    id="email"
                    type="text"
                    component="input"
                    autoComplete="none"
                  />
                  <label htmlFor="email">Email</label>
                  <div style={{color: 'red', marginLeft: '45px'}}>{this.props.errorMessage}</div>
                  <div style={{color: 'red', marginLeft: '45px'}}>{this.state.errorEmail}</div>
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
            <div className="row">
              <div className="col s12 m6">
                <div className="input-field">
                  <i className="material-icons prefix">lock</i>
                  <Field
                    name="password"
                    id="password"
                    type="text"
                    component="input"
                    autoComplete="none"
                  />
                  <label htmlFor="password">Password</label>  
                  <div style={{color: 'red', marginLeft: '45px'}}>{this.state.validPassword}</div>
                </div>
              </div>
              <div className='col s12 m6'>
                <button onClick={this.showWidget} className="btn-login">{this.state.picOk && <i className="far fa-check-square"></i>} Upload Picture <i className="fas fa-image"></i></button>
              </div>
            </div>
            <button className="waves-effect waves-light btn">
              <i className="material-icons right">cloud</i>Edit
            </button>
          </form>
          <Modal trigger={<button className="waves-effect waves-light btn right"><i className="material-icons right">cloud</i>Delete Your user</button>}>
            <div style={{ padding: "30px" }}>
              <h5>Are you sure you want to delete your User?</h5>
            <button
            onClick={this.onDelete}
            className="waves-effect waves-light btn right"
          >
            <i className="material-icons right">cloud</i>Delete Your user definitely
          </button>
            </div>
          </Modal>
          
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
