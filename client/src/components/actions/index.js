import keys from "../../config/keys";
import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR,
  EDIT_USER,
  GET_USER_ID,
  EDIT_VEHICLE,
  VEHICLE_ERROR,
  GET_MY_VEHICLE,
  GET_VEHICLE_CITY,
  GET_VEHICLE_ID,
  EDIT_RESERVATION,
  GET_MY_RESERVATION,
  INFO_USER,
  GET_MY_RESERVATION_OF_MY_VEHICLE,
  RESERVATION_ERROR,
  GET_REVIEW,
  REVIEW_ERROR
} from "./types";
import * as JWT from "jwt-decode";


/***************************************  USER  ***********************************************/
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

// Fetch the user by Passport JWT
export const getUserId = (id) => async dispatch => {
    const response = await axios.get(`/api/user/info/${id}`);
    dispatch({ type: INFO_USER, payload: response.data });
};



// Edit User
export const editUser = (id, formValues, callback) => async dispatch => {
  try {
    dispatch({ type: AUTH_ERROR, payload: "" });
    const response = await axios.post(
      `${keys.siteUrl}/api/user/${id}`,
      formValues
    );
    dispatch({ type: EDIT_USER, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

// User delete
export const deleteUser = (id, callback) => async dispatch => {
  await axios.delete(`/api/user/${id}`);
  dispatch({ type: EDIT_USER, payload: "" });
  localStorage.removeItem("token");
  callback(); /* history callback */
};

// Get User by IDVehicle
export const getUserByVehicleId = (id) => async dispatch => {
  const response = await axios.get(`/api/user/byVehicle/${id}`);
  dispatch({ type: GET_USER_ID, payload: response.data });
};

/***************************************  VEHICLE  ***********************************************/

// Post Vehicle
export const createVehicle = (id, formValues, callback) => async dispatch => {
  try {
    const response = await axios.post(
      `${keys.siteUrl}/api/user/${id}/createVehicle`,
      formValues
    );
    dispatch({ type: EDIT_VEHICLE, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: VEHICLE_ERROR, payload: "error" });
  }
};

// Get Vehicle by UserId
export const getVehicleByUser = id => async dispatch => {
  try {
    const response = await axios.get(
      `${keys.siteUrl}/api/user/${id}/myVehicles`
    );
    dispatch({ type: GET_MY_VEHICLE, payload: response.data });
  } catch (e) {
    dispatch({ type: VEHICLE_ERROR, payload: "error" });
  }
};

// Get Vehicle all Vehicles
export const getAllVehicleByCity = city => async dispatch => {
  try {
    const response = await axios.get(`/api/city/${city}`);
    dispatch({ type: GET_VEHICLE_CITY, payload: response.data });
  } catch (e) {
    dispatch({ type: VEHICLE_ERROR, payload: "error" });
  }
};

// Get vehicle by VehicleId
export const getVehicleById = id => async dispatch => {
  try {
    const response = await axios.get(`/api/vehicle/${id}`);
    dispatch({ type: GET_VEHICLE_ID, payload: response.data });
  } catch (e) {
    dispatch({ type: VEHICLE_ERROR, payload: "error" });
  }
};

/***************************************  Payment  ***********************************************/
// + creation of the reservation
export const handleToken = (token, form) => async dispatch =>{
  const body = {
    form: form,
    token: token,
  };
  const res = await axios.post("/api/stripe", body);
  dispatch({ type: EDIT_RESERVATION, payload: res.data });
};


/***************************************  Reservation  ***********************************************/
// Get Reservation
export const getReservationByUser = id => async dispatch => {
  try {
    const response = await axios.get(
      `/api/reservation/${id}`
    );
    dispatch({ type: GET_MY_RESERVATION, payload: response.data });
  } catch (e) {
    dispatch({ type: RESERVATION_ERROR, payload: "error" });
  }
};

// Reservation of my own vehicle
export const getReservationMyVehicle = id => async dispatch => {
  try {
    const response = await axios.get(
      `/api/reservationOfMyVehicle/${id}`
    );
    dispatch({ type: GET_MY_RESERVATION_OF_MY_VEHICLE, payload: response.data });
  } catch (e) {
    dispatch({ type: RESERVATION_ERROR, payload: "error" });
  }
};

/***************************************  Review  ***********************************************/

export const getReviewByVehicle = (id) => async dispatch => {
  try {
    const response = await axios.get( `/api/review/${id}`);
    dispatch({ type: GET_REVIEW, payload: response.data });
  } catch (e) {
    dispatch({ type: REVIEW_ERROR, payload: "error" });
  }
};

export const createReview = (body,callback) => async dispatch => {
  try {
    const response = await axios.post( `/api/review`, body);
    callback(); 
  } catch (e) {
    dispatch({ type: REVIEW_ERROR, payload: "error" });
  }
};

