import React, { useState } from "react";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import logo from './../assets/logo.svg';

function Navbar(props) {
  const [navCollapsed, setNavCollapsed] = useState(true);

  function handleToggleNav() {
    setNavCollapsed(!navCollapsed);
  }

  function handleLogout() {
    handleToggleNav()
    props.logout()
  }

  const { isLoggedin } = props;
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top border-bottom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} width="30" height="30" className="d-inline-block align-top pr-1" alt="" />
          Recipease
      </Link>
        <button data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className='navbar-toggler collapsed' onClick={handleToggleNav} type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={(navCollapsed ? 'collapse' : '') + ' navbar-collapse'}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleToggleNav}>Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipes" onClick={handleToggleNav}>Recipes</Link>
            </li>
            {isLoggedin ? (
              <li className="nav-item">
                <Link className="nav-link" to="/profile" onClick={handleToggleNav}>Profile</Link>
              </li>
            ) : (null)}
          </ul>

          <ul className="navbar-nav">
            {isLoggedin ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/"><button className="btn btn-outline-primary" type="submit" onClick={handleLogout}>Logout</button></Link>
                </li>
              </>
            ) :
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login"><button className="btn btn-outline-primary" type="submit" onClick={handleToggleNav}>Login</button></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup"><button className="btn btn-primary" type="submit" onClick={handleToggleNav}>Sign up</button></Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(withAuth(Navbar));
