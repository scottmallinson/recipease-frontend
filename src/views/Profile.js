import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import user from '../lib/user-service';
import Pantry from "./Pantry";

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createdRecipes: [],
      savedRecipes: []
    }
  }

  componentDidMount() {
    console.log('user ID', this.props.user._id)
    console.log('this.state', this.state)
    user.getUser(this.props.user._id)
      .then((data) => {
        this.setState({ createdRecipes: data.createdRecipes, savedRecipes: data.savedRecipes })
      })
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <div className="container pt-5">
        <h1 className="display-4">This is {this.props.user.username}'s profile</h1>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active" id="nav-pantry-tab" data-toggle="tab" href="#nav-pantry" role="tab" aria-controls="nav-pantry" aria-selected="false">Pantry</a>
            <a className="nav-item nav-link" id="nav-created-tab" data-toggle="tab" href="#nav-created" role="tab" aria-controls="nav-created" aria-selected="true">Created recipes</a>
            <a className="nav-item nav-link" id="nav-saved-tab" data-toggle="tab" href="#nav-saved" role="tab" aria-controls="nav-saved" aria-selected="false">Saved recipes</a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-pantry" role="tabpanel" aria-labelledby="nav-pantry-tab">
            <Pantry />
          </div>
          <div className="tab-pane fade" id="nav-created" role="tabpanel" aria-labelledby="nav-created-tab">
            <h2>Created recipes</h2>
            {this.state.createdRecipes.map((recipe) =>
              <Link key={recipe._id} to={{
                pathname: `/recipes/${recipe._id}`,
                state: { selectedRecipe: recipe }
              }}>
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
              </Link>
            )}
          </div>
          <div className="tab-pane fade" id="nav-saved" role="tabpanel" aria-labelledby="nav-saved-tab">
            <h2>Saved recipes</h2>
            {this.state.savedRecipes.map((recipe) =>
              <Link key={recipe._id} to={{
                pathname: `/recipes/${recipe._id}`,
                state: { selectedRecipe: recipe }
              }}>
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Profile);
