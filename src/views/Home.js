import React, { Component } from "react";
import Search from "./../components/Search";
import FeaturedRecipeCard from "./../components/FeaturedRecipeCard";
import { withAuth } from './../lib/AuthProvider';
import recipe from '../lib/recipe-service';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numRecipes: 0,
      recipes: [],
      pantry: []
    }
  }

  componentDidMount() {
    recipe.getAllRecipes()
      .then((data) => {
        this.setState({
          numRecipes: data.length,
          recipes: data.reverse().slice(0, 3)
        })
      })
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <div>
        <div className="jumbotron bg-light vw-100 d-flex align-items-center">
          <div className="container">
            <h1 className="display-4">Recipease</h1>
            <p className="lead">Recipes for the time conscious.</p>
            <hr className="my-4" />
            <p>Search our vast database of <strong>{this.state.numRecipes}</strong> recipes by name or ingredient.</p>
            <Search pantry={this.state.pantry} />
          </div>
        </div>
        <div className="container pb-5 mb-3">
          <h2>Freshest recipes</h2>
          <div className="card-deck">
            {this.state.recipes.map((recipe) =>
              <FeaturedRecipeCard key={recipe._id} recipe={recipe} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Home);
