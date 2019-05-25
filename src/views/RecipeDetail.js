import React, { Component } from "react";
import { withAuth } from './../lib/AuthProvider';
const axios = require('axios');

class RecipeDetail extends Component {
  constructor(props) {
    super(props)
    const { _id, creatorId, name, description, photoUrl, duration, ingredients, instructions, servings } = this.props.location.state.selectedRecipe;
    this.state = {
      _id,
      creatorId,
      name,
      description,
      photoUrl,
      duration,
      ingredients,
      instructions,
      servings,
      editable: false,
      editing: false
    }
  }

  handleSaveRecipe(e) {
    e.preventDefault();
    const recipeId = this.state.recipe._id;
    const userId = this.props.user._id;
    axios.put('http://localhost:5000/recipes/save', {
      recipeId,
      userId
    })
    .then((response) => this.props.user.savedRecipes = response.data.savedRecipes)
    .catch((error) => console.log(error));
  }

  handleEditRecipe(e) {
    e.preventDefault();
    this.setState({
      editing: !this.state.editing
    })
  }

  handleItemChange(e, inputIndex) {
    const {ingredients} = this.state;
    let newIngredients = [...ingredients];
    newIngredients.map((_, index, newIngredients)=>{
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
    const {instructions} = this.state;
    let newInstructions = [...instructions];
    newInstructions.map((_, index, newInstructions)=>{
      return index === inputIndex ? newInstructions[index] = e.target.value : null;
    })
    this.setState({
      instructions: newInstructions,
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
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
    const { _id, creatorId, name, description, photoUrl, duration, ingredients, instructions, servings } = this.state;
    axios.put('http://localhost:5000/recipes/update', {
      _id,
      creatorId,
      name,
      description,
      photoUrl,
      duration,
      ingredients,
      instructions,
      servings
    })
    .then((response) => this.setState({editing: false}))
    .catch((error) => console.log(error));
  }

  componentDidMount() {
    if (this.props.user) {
      if (this.props.user._id === this.state.creatorId) {
        this.setState({
          editable: true
        })
      }
    }
  }

  render() {
    return (
      <div>
        <h1>{ this.state.name }</h1>
        { this.state.editable ? <button onClick={(e) => this.handleEditRecipe(e)}>Edit recipe</button> : null }
        <button onClick={(e) => this.handleSaveRecipe(e)}>Save recipe</button>
        { !this.state.editing ? 
          <>
            <p>{this.state.description}</p>
            <p>Duration: {this.state.duration}</p>
            <p>Servings: {this.state.servings}</p>
            <ul>
            {this.state.ingredients.map((item, index) => {
              return (
                <li key={index}><strong>{item.quantity}</strong> {item.name}</li>
              )
            })}
            </ul>
            <ol>
            {this.state.instructions.map((item, index) => {
              return (
                <li key={index}>{item}</li>
              )
            })}
            </ol>
          </>
        :
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
                  <input onChange={(e) => this.handleItemChange(e, index)} value={ingredient.quantity} name="quantity" />
                  <input onChange={(e) => this.handleItemChange(e, index)} value={ingredient.name} name="name" />
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
          <button onClick={(e) => this.handleEditRecipe(e)}>Cancel changes</button>
          <button onClick={(e) => this.handleSubmit(e)}>Save recipe</button> 
        </form>
      }
      </div>
    );
  }
}

export default withAuth(RecipeDetail);