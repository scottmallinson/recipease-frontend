import React, { Component } from "react";

export default class Recipes extends Component {
  state = {
      selectedRecipe: this.props.location.state.selectedRecipe
  }

  render() {
    const { selectedRecipe } = this.state;
    return (
      <div>
        <h1>{ selectedRecipe.name }</h1>
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
