import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
// @ts-ignore
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      history.push("/login");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response && err.response.data ? err.response.data : "",
      });
    });
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      setAuthToken(token);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  //remove from the local storage
  localStorage.removeItem("jwtToken");
  //remove auth token
  setAuthToken(false);
  //set current user as empty object
  dispatch(setCurrentUser({}));
};
