import axios from "axios";
import { setCurrentUser } from "../actions/authActions";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorizatoin"];
  }
};

export const logoutUser = () => {
  //remove item
  localStorage.removeItem("jwt-token");
  setAuthToken(false);
  setCurrentUser({});
};
export default setAuthToken;
