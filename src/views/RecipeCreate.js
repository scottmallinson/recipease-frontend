import React, { Component } from "react";

export default class Recipes extends Component {
  state = {
    ingredients: [],
    instructions: []
  }

  addIngredient(e, items) {
    e.preventDefault();
    this.setState({
      ingredients: [...this.state.ingredients, '']
    })
  }

  handleIngredientChange(e, inputIndex) {
    const {ingredients} = this.state;
    let newIngredients = [...ingredients];
    newIngredients.map((_, index, newIngredients)=>{
      return index === inputIndex ? newIngredients[index] = e.target.value : null;
    })
    this.setState({
      ingredients: newIngredients,
    })
  }

  handleIngredientRemove(e, index) {
    e.preventDefault();
    this.state.ingredients.splice(index, 1);
    this.setState({
      ingredients: this.state.ingredients
    })
  }

  addInstruction(e, items) {
    e.preventDefault();
    this.setState({
      instructions: [...this.state.instructions, '']
    })
  }

  handleInstructionChange(e, inputIndex) {
    const {instructions} = this.state;
    let newInstructions = [...instructions];
    newInstructions.map((_, index, newInstructions)=>{
      return index === inputIndex ? newInstructions[index] = e.target.value : null;
    })
    this.setState({
      instructions: newInstructions,
    })
  }

  handleInstructionRemove(e, index) {
    e.preventDefault();
    this.state.instructions.splice(index, 1);
    this.setState({
      instructions: this.state.instructions
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h1>Page for creating a recipe</h1>
        <form>
          <input type="text" name="name" placeholder="name" required />
          <textarea name="description" placeholder="description" required></textarea>
          <input type="text" name="duration" placeholder="duration" required />
          <input type="text" name="servings" placeholder="servings" required />
          <h3>Ingredients</h3>
          {
            this.state.ingredients.map((ingredient, index) => {
              return (
                <div key={index}>
                  <input onChange={(e) => this.handleIngredientChange(e, index)} value={ingredient} />
                  <button onClick={(e) => this.handleIngredientRemove(e, index)}>Remove</button>
                </div>
              )
            })
          }
          <button onClick={(e) => this.addIngredient(e)}>Add ingredient</button>
          <h3>Instructions</h3>
          {
            this.state.instructions.map((instruction, index) => {
              return (
                <div key={index}>
                  <input onChange={(e) => this.handleInstructionChange(e, index)} value={instruction} />
                  <button onClick={(e) => this.handleInstructionRemove(e, index)}>Remove</button>
                </div>
              )
            })
          }
          <button onClick={(e) => this.addInstruction(e)}>Add instruction</button>
          <button onClick={(e) => this.handleSubmit(e)}>Save recipe</button> 
        </form>
        
      </div>
    );
  }
}
