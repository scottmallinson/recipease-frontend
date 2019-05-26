import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import user from '../lib/user-service';

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
      <div>
        <h2>Profile.js</h2>
        <h1>This is {this.props.user.username}'s profile</h1>
        <button>Edit profile</button>
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
    );
  }
}

export default withAuth(Profile);
