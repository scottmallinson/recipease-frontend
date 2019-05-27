import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Navbar extends Component {
  render() {
    const { logout, isLoggedin } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/logo.svg" width="30" height="30" className="d-inline-block align-top pr-1" alt="" />
            Recipease
        </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recipes">Recipes</Link>
              </li>

              {isLoggedin ? (

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>

              ) : (
                  null
                )}
            </ul>

            {isLoggedin ? (

              <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={logout}>Logout</button>

            ) :
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/login"><button className="btn btn-outline-primary" type="submit">Login</button></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup"><button className="btn btn-primary" type="submit">Sign up</button></Link>
                </li>
              </ul>
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
