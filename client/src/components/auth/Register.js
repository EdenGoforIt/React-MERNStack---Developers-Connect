import React, { Component, useEffect, useState } from "react";

import classnames from "classnames";
import { useDispatch, connect, useSelector } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();

  const { auth, errors } = useSelector((state) => state);

  const handleName = (e) => {
    setName({ name: e.target.value });
  };
  const handleEmail = (e) => {
    setEmail({ email: e.target.value });
  };
  const handlePassword = (e) => {
    setPassword({ password: e.target.value });
  };
  const handlePassword2 = (e) => {
    setPassword2({ password2: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    dispatch(registerUser(newUser));
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your account</p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors && errors.name,
                  })}
                  placeholder="Name"
                  name="name"
                  onChange={handleName}
                />
                {errors && errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors && errors.email,
                  })}
                  placeholder="Email Address"
                  name="email"
                  onChange={handleEmail}
                />
                {errors && errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                <small className="form-text text-muted">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors && errors.password,
                  })}
                  placeholder="Password"
                  name="password"
                  onChange={handlePassword}
                />
                {errors && errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors && errors.password2,
                  })}
                  placeholder="Confirm Password"
                  name="password2"
                  onChange={handlePassword2}
                />
                {errors && errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     registerUser: (newUser) => dispatch(registerUser(newUser)),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Register);
