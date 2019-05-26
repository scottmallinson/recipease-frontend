import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withAuth } from './../lib/AuthProvider';
import recipe from '../lib/recipe-service';

class Recipes extends Component {
  constructor() {
    super()
    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    recipe.getAllRecipes()
      .then(({ data }) => {
        this.setState({ recipes: data })
      })
      .catch((error) => console.log(error))
  }
  
  render() {
    return (
      <div>
        <h1>Recipes</h1>
        {this.state.recipes.map((recipe) =>
          <Link key={recipe._id} to={{
            pathname: `/recipes/${recipe._id}`,
            state: { selectedRecipe: recipe }
          }}>
            <h1>{recipe.name}</h1>
            <p>{recipe.description}</p>
          </Link>
        )}
      </div>
    );
  }
}

export default withAuth(Recipes);