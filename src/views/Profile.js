import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
class Pantry extends Component {
  render() {
    return (
      <div>
        <h2>Profile.js</h2>
        <h1>This is {this.props.user.username}'s profile</h1>
        <p>This is your pantry</p>
      </div>
    );
  }
}

export default withAuth(Pantry);
