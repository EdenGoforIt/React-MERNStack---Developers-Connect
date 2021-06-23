import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropType from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  <Route
    {...rest}
    render={(props) => {
      auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
