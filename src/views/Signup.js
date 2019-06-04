import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import { Helmet } from 'react-helmet';
class Signup extends Component {
  state = {
    username: "",
    password: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.signup({ username, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;
    return (
      <>
        <Helmet>
          <title>Sign up &middot; Recipease</title>
          <meta name="description" content="Sign up for a free Recipease account" />
          <meta property="og:type" content="article" />
        </Helmet>
        <div className="container py-5">
          <h1 className="display-4">Sign up</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Enter username" name="username" value={username} onChange={this.handleChange} autoComplete="off" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} autoComplete="off" required />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Sign up</button>
            </div>
            <div className="form-group">
              <p>Already have account?
            <Link to={"/login"}> Login</Link></p>
            </div>
          </form>

        </div>
      </>
    );
  }
}

export default withAuth(Signup);
