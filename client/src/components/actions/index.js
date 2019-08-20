import keys from "../../config/keys";
import axios from "axios";
import { AUTH_USER, AUTH_ERROR, EDIT_USER , EDIT_VEHICLE, VEHICLE_ERROR, GET_MY_VEHICLE} from "./types";
import * as JWT from "jwt-decode";

// Signup with Passport JWT
export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${keys.siteUrl}/signup`, formProps);
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
    const response = await axios.get(`${keys.siteUrl}/api/user/${data.id}`);
    dispatch({ type: AUTH_USER, payload: response.data });
  } else {
    token = null;
    const res = await axios.get("/api/current_user");
    dispatch({ type: AUTH_USER, payload: res.data });
  }
};

// Edit User 
export const editUser = (id, formValues, callback) => async dispatch => {
  try {
    dispatch({ type: AUTH_ERROR, payload: "" });
    const response = await axios.post(`${keys.siteUrl}/api/user/${id}`, formValues);
    dispatch({ type: EDIT_USER, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

// Edit delete 
export const deleteUser = (id, callback) => async dispatch => {
  await axios.delete(`/api/user/${id}`);
  dispatch({ type: EDIT_USER, payload: '' });
  localStorage.removeItem("token");
  callback(); /* history callback */
};

// Post Vehicle 
export const createVehicle = (id,formValues, callback) => async dispatch => {
  try {
    const response = await axios.post(`${keys.siteUrl}/api/user/${id}/createVehicle`, formValues);
    dispatch({ type: EDIT_VEHICLE, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: VEHICLE_ERROR, payload: "error" });
  }
}

// Get Vehicle by User
export const getVehicleByUser = (id) => async dispatch => {
  try {
    const response = await axios.get(`${keys.siteUrl}/api/user/${id}/myVehicles`);
    dispatch({ type: GET_MY_VEHICLE, payload: response.data });
  }catch (e) {
    dispatch({ type: VEHICLE_ERROR, payload: "error" });
  }
}
