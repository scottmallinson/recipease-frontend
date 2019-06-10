import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import { Helmet } from 'react-helmet';

function Login(props) {
  const [state, setState] = useState({ username: "", password: "" });

  function handleFormSubmit(e) {
    e.preventDefault();
    const { username, password } = state;
    props.login({ username, password });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Login &middot; Recipease</title>
        <meta name="description" content="Log into your Recipease account" />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="container py-5">
        <h1 className="display-4">Login</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Enter username" name="username" value={state.username} onChange={handleChange} autoComplete="off" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={state.password} onChange={handleChange} autoComplete="off" required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
          <div className="form-group">
            <p>Don't have an account?
          <Link to={"/signup"}> Sign up</Link></p>
          </div>
        </form>
      </div>
    </>
  );
}

export default withAuth(Login);
