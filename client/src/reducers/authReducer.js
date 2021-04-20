import isEmpty from "../validation/is-empty";

import { REGISTER_USER, SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};
const registerUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default registerUser;
