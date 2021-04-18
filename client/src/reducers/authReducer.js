import { TEST_DISPATCH } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};
const registerUser = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default registerUser;
