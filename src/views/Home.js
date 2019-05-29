import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Search from "./..//components/Search";
import { withAuth } from './../lib/AuthProvider';
import recipe from '../lib/recipe-service';
const moment = require('moment');

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      pantry: []
    }
  }

  componentDidMount() {
    recipe.getAllRecipes()
      .then((data) => {
        this.setState({
          recipes: data
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
            <p>Search our vast database of <strong>{this.state.recipes.length}</strong> recipes by name or ingredient.</p>
            <Search pantry={this.state.pantry} />
          </div>
        </div>
        <div className="container pb-5 mb-3">
          <h2>Freshest recipes</h2>
          <div className="card-deck">
            {this.state.recipes.reverse().slice(0, 3).map((recipe) =>
              <div className="card" key={recipe._id}>
                <img src={recipe.photoUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={{
                      pathname: `/recipes/${recipe._id}`,
                      state: { selectedRecipe: recipe }
                    }}>{recipe.name}</Link>
                  </h5>
                  <p className="card-text">{recipe.description}</p>
                  <p className="card-text"><small className="text-muted">Last updated {moment(recipe.updated_at).fromNow()}</small></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Home);
