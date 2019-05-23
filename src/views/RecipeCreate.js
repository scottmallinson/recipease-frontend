import React, { Component } from "react";

export default class Recipes extends Component {
  state = {
    recipe: []
  }

  render() {
    const { selectedRecipe } = this.state;
    console.log(selectedRecipe);
    return (
      <div>
        <h1>Page for creating a recipe</h1>
      </div>
    );
  }
}
