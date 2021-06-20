import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
} from "./types";

export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading);
  console.log(axios.defaults);
  axios
    .get("api/profile", { port: 5000 })
    .then((res) =>
      setTimeout(() => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        });
      }, 5000)
    )
    .catch((err) =>
      setTimeout(() => {
        dispatch({
          type: GET_PROFILE,
          payload: {},
        });
      }, 5000)
    );
};

export const setProfileLoading = () => {
  return { type: PROFILE_LOADING };
};
export const clearCurrentProfile = () => {
  return { type: CLEAR_CURRENT_PROFILE };
};
