import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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

function App() {
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
      <Footer />
    </AuthProvider>
  );
}

export default App;
