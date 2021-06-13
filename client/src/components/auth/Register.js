import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import classnames from "classnames";
import { useDispatch, connect, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";

export default function Register() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();

  const { auth, errors } = useSelector((state) => state);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    registerUser(newUser, history);
    dispatch(registerUser(newUser));
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  });
  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your account</p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Name"
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                error={errors.name}
              />
              <TextFieldGroup
                placeholder="Email"
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                error={errors.email}
                info="This email use Gravatar"
              />
              <TextFieldGroup
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                error={errors.password}
              />
              <TextFieldGroup
                placeholder="Confirm Password"
                type="password"
                name="password2"
                value={password2}
                onChange={handlePassword2}
                error={errors.password2}
              />

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
