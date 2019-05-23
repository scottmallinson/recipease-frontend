import React, { Component } from "react";

export default class Recipes extends Component {
  state = {
      selectedRecipe: this.props.location.state.selectedRecipe
  }

  render() {
    const { selectedRecipe } = this.state;
    console.log(selectedRecipe);
    return (
      <div>
        <h1>{ selectedRecipe.name }</h1>
        <p>{selectedRecipe.description}</p>
      </div>
    );
  }
}
