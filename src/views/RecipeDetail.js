import React, { Component } from "react";
import { withAuth } from './../lib/AuthProvider';
const axios = require('axios');

class RecipeDetail extends Component {
  state = {
      selectedRecipe: this.props.location.state.selectedRecipe,
      editable: false
  }

  handleSaveRecipe(e) {
    e.preventDefault();
    const recipeId = this.state.selectedRecipe._id;
    const userId = this.props.user._id;
    axios.put('http://localhost:5000/recipes/save', {
      recipeId,
      userId
    })
    .then((response) => this.props.user.savedRecipes = response.data.savedRecipes)
    .catch((error) => console.log(error));
  }

  componentDidMount() {
    if (this.props.user) {
      if (this.props.user._id === this.state.selectedRecipe.creatorId) {
        this.setState({
          editable: true
        })
      }
    }
  }

  render() {
    const { selectedRecipe } = this.state;
    return (
      <div>
        <h1>{ selectedRecipe.name }</h1>
        { this.state.editable ? <button>Edit recipe</button> : null }
        <button onClick={(e) => this.handleSaveRecipe(e)}>Save recipe</button>
        <p>{selectedRecipe.description}</p>
        <p>Duration: {selectedRecipe.duration}</p>
        <p>Servings: {selectedRecipe.servings}</p>
        <ul>
        {selectedRecipe.ingredients.map((item) => {
          return (
            <li key={item._id}><strong>{item.name}</strong> - {item.quantity}</li>
          )
        })}
        </ul>
        <ol>
        {selectedRecipe.instructions.map((item, index) => {
          return (
            <li key={index}>{item}</li>
          )
        })}
        </ol>
      </div>
    );
  }
}

export default withAuth(RecipeDetail);