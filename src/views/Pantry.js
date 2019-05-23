import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
class Pantry extends Component {
  render() {
    return (
      <div>
        <h2>Pantry.js</h2>
        <h1>Welcome {this.props.user.username}</h1>
        <p>This is your pantry</p>
      </div>
    );
  }
}

export default withAuth(Pantry);
