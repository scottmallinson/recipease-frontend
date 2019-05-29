import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="navbar fixed-bottom navbar-light bg-light border-top">
        <div className="container p-0">
          <span className="navbar-text small" href="/">&copy; 2019 Recipease &mdash; <a href="https://scottmallinson.com" target="_blank" rel="me noopener noreferrer" className="text-reset">Scott Mallinson</a></span>
        </div>
      </footer>
    );
  }
}

export default Footer;
