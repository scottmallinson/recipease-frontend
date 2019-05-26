import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import recipe from '../lib/recipe-service';

class Recipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creatorId: this.props.user._id,
      name: '',
      description: '',
      photoUrl: '',
      duration: '',
      ingredients: [{
        name: '',
        quantity: ''
      }],
      instructions: [],
      servings: ''
    }
  }

  handleItemChange(e, inputIndex) {
    const { ingredients } = this.state;
    let newIngredients = [...ingredients];
    newIngredients.map((_, index, newIngredients) => {
      return index === inputIndex ? newIngredients[index][e.target.name] = e.target.value : null;
    })
    this.setState({
      ingredients: newIngredients,
    })
  }

  handleItemRemove(e, index) {
    e.preventDefault();
    this.state.ingredients.splice(index, 1);
    this.setState({
      ingredients: this.state.ingredients
    })
  }

  addItem(e, items) {
    e.preventDefault();
    this.setState({
      ingredients: [...this.state.ingredients, {
        name: '',
        quantity: ''
      }]
    })
  }

  handleInstructionChange(e, inputIndex) {
    const { instructions } = this.state;
    let newInstructions = [...instructions];
    newInstructions.map((_, index, newInstructions) => {
      return index === inputIndex ? newInstructions[index] = e.target.value : null;
    })
    this.setState({
      instructions: newInstructions,
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleInstructionRemove(e, index) {
    e.preventDefault();
    this.state.instructions.splice(index, 1);
    this.setState({
      instructions: this.state.instructions
    })
  }

  addInstruction(e, items) {
    e.preventDefault();
    this.setState({
      instructions: [...this.state.instructions, '']
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.ingredients, this.state.instructions);
    const { creatorId, name, description, photoUrl, duration, ingredients, instructions, servings } = this.state;
    recipe.create({
      creatorId,
      name,
      description,
      photoUrl,
      duration,
      ingredients,
      instructions,
      servings
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>Page for creating a recipe</h1>
        <form>
          <input type="text" name="name" placeholder="name" value={this.state.name} onChange={(e) => this.handleChange(e)} required />
          <textarea name="description" placeholder="description" value={this.state.description} onChange={(e) => this.handleChange(e)} required></textarea>
          <input type="text" name="duration" placeholder="duration" value={this.state.duration} onChange={(e) => this.handleChange(e)} required />
          <input type="text" name="servings" placeholder="servings" value={this.state.servings} onChange={(e) => this.handleChange(e)} required />
          <h3>Ingredients</h3>
          {
            this.state.ingredients.map((ingredient, index) => {
              return (
                <div key={index}>
                  <input onChange={(e) => this.handleItemChange(e, index)} value={ingredient.name} name="name" />
                  <input onChange={(e) => this.handleItemChange(e, index)} value={ingredient.quantity} name="quantity" />
                  <button onClick={(e) => this.handleItemRemove(e, index)}>Remove</button>
                </div>
              )
            })
          }
          <button onClick={(e) => this.addItem(e)}>Add ingredient</button>
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

export default withAuth(Recipes);
