import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withAuth } from './../lib/AuthProvider';
import recipe from '../lib/recipe-service';
import Search from "./../components/Search";

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
        {/* <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-light">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Recipes</li>
          </ol>
        </nav> */}
        <h1 className="display-4">Recipes</h1>
        <div className="jumbotron bg-light d-flex align-items-center">
          <div className="container">
            <p className="lead">Search our database by recipe name or ingredient.</p>
            <Search pantry={this.state.pantry} />
            <hr className="my-4" />
            <a className="form-control btn btn-outline-secondary" href="/recipes/create">Contribute a recipe</a>
          </div>
        </div>
        {this.state.recipes.map((recipe) =>
          <div key={recipe._id} className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={`https://source.unsplash.com/1600x1200/?${recipe.name}`} className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={{
                      pathname: `/recipes/${recipe._id}`,
                      state: { selectedRecipe: recipe }
                    }}>{recipe.name}</Link>
                  </h5>
                  <p className="card-text">{recipe.description}</p>
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