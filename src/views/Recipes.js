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
      .then((data) => {
        this.setState({ recipes: data })
      })
      .catch((error) => console.log(error))
  }
  
  render() {
    return (
      <div className="container pt-5">
        <h1 className="display-4">Recipes</h1>
        {this.state.recipes.map((recipe) =>
          <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src="..." className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  <Link key={recipe._id} to={{
            pathname: `/recipes/${recipe._id}`,
            state: { selectedRecipe: recipe }
          }}>{recipe.name}</Link>
                </h5>
                <p className="card-text">{recipe.description}</p>
                <p className="card-text"><small className="text-muted">Last updated {recipe.updated_at}</small></p>
              </div>
            </div>
          </div>
        </div>
        )}

      </div>
    );
  }
}

export default withAuth(Recipes);