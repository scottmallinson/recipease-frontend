import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div>
        {/* <h2>Navbar.js</h2> */}
        
        {isLoggedin ? (
          <>
            {/* <p>username: {user.username}</p> */}
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/recipes/create">Add a recipe</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/pantry">Pantry</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(Navbar);
