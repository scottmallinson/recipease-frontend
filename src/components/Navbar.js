import React, { Component } from "react";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: null,
      navCollapsed: true
    }
  }

  handleToggleNav = () => {
    this.setState({ navCollapsed: !this.state.navCollapsed })
  }

  render() {
    const {navCollapsed} = this.state
    const { logout, isLoggedin } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/" onClick={this.handleToggleNav}>
            <img src="/logo.svg" width="30" height="30" className="d-inline-block align-top pr-1" alt="" />
            Recipease
        </Link>
          <button
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className='navbar-toggle collapsed'
            onClick={this.handleToggleNav}
            type='button'
            >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={(navCollapsed ? 'collapse' : '') + ' navbar-collapse'}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={this.handleToggleNav}>Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recipes" onClick={this.handleToggleNav}>Recipes</Link>
              </li>

              {isLoggedin ? (

                <li className="nav-item">
                  <Link className="nav-link" to="/profile" onClick={this.handleToggleNav}>Profile</Link>
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
                  <Link className="nav-link" to="/login"><button className="btn btn-outline-primary" type="submit" onClick={this.handleToggleNav}>Login</button></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup"><button className="btn btn-primary" type="submit" onClick={this.handleToggleNav}>Sign up</button></Link>
                </li>
              </ul>
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(withAuth(Navbar));
