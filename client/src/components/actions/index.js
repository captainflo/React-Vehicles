import keys from "../../config/keys";
import axios from "axios";
import { AUTH_USER, AUTH_ERROR, EDIT_USER } from "./types";
import * as JWT from "jwt-decode";

// Signup with Passport JWT
export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${keys.siteUrl}/signup`, formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    // then when you have the token decode it.
    let token = localStorage.token;
    if (token) {
      // Decode token
      token = JWT(token);
      // let token to variable data
      let data = token;
      data = {
        _id: data.sub,
        email: data.email
      };
      dispatch({ type: AUTH_USER, payload: data });
    } else {
      token = null;
    }
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

// Signin with Passport JWT
export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${keys.siteUrl}/signin`, formProps);
    localStorage.setItem("token", response.data.token);
    // then when you have the token decode it.
    let token = localStorage.token;
    if (token) {
      // Decode token
      token = JWT(token);
      // let token to variable data
      let data = token;
      data = {
        id: data.sub,
        email: data.email
      };
      const response = await axios.get(`/api/user/${data.id}`);
      dispatch({ type: AUTH_USER, payload: response.data });
    } else {
      token = null;
    }
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};

// Signout User by Auth or Passport JWT
export const signout = () => async dispatch => {
  // Signout for Auth(Google, insta, linkedin, facebook)
  await axios.get("/api/logout");
  dispatch({ type: AUTH_USER, payload: "" });
  localStorage.removeItem("token");
  dispatch({ type: AUTH_ERROR, payload: "" });
};

// Fetch the user by Passport JWT 
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  let token = localStorage.token;
  if (token) {
    // Decode token
    token = JWT(token);
    // let token to variable data
    let data = token;
    data = {
      id: data.sub,
      email: data.email
    };
    const response = await axios.get(`/api/user/${data.id}`);
    dispatch({ type: AUTH_USER, payload: response.data });
  } else {
    token = null;
    dispatch({ type: AUTH_USER, payload: res.data });
  }
};

// Edit User 
export const editUser = (id, formValues) => async dispatch => {
    const response = await axios.post(`/user/${id}`, formValues);
    dispatch({ type: EDIT_USER, payload: response.data });
};
