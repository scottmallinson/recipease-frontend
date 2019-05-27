import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Recipes from "./views/Recipes";
import RecipeCreate from "./views/RecipeCreate";
import RecipeDetail from "./views/RecipeDetail";
import Pantry from "./views/Pantry";
import Profile from "./views/Profile";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Home from "./views/Home";
import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";
import AuthProvider from "./lib/AuthProvider";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Navbar />
          <Switch>
            <PrivateRoute exact path="/recipes/create" component={RecipeCreate} />
            <Route exact path="/recipes/:id" component={RecipeDetail} />
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/pantry" component={Pantry} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/" component={Home} />
          </Switch>
          <nav className="navbar navbar-light bg-light">
            <div className="container">
              <span className="navbar-text" href="/">&copy; Recipease - Scott Mallinson 2019.</span>
            </div>
          </nav>
      </AuthProvider>
    );
  }
}

export default App;
