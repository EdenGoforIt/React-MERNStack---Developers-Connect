import axios from "axios";
import { GET_ERRORS } from "./types";

export const registerUser = (payload) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/register", payload)
    .then((res) => console.log(res))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
