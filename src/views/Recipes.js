import React, { Component } from "react";
import { Link } from 'react-router-dom';
const axios = require("axios");

export default class Recipes extends Component {
  constructor() {
    super()
    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/recipes/')
    .then(({ data }) => {
      this.setState({recipes: data})
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
