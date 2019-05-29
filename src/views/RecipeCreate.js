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
      servings: '',
      disable: true
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
    const { creatorId, name, description, photoUrl, duration, ingredients, instructions, servings } = this.state;
    recipe.createRecipe({
      creatorId,
      name,
      description,
      photoUrl,
      duration,
      ingredients,
      instructions,
      servings
    })
      .then((response) => this.props.history.push('/recipes'))
      .catch((error) => console.log(error));
  }

  fileOnchange = (e) => {
    const file = e.target.files[0];
    const uploadData = new FormData()
    uploadData.append('recipease', file)
    recipe.uploadRecipeImage(uploadData)
    .then((photoUrl) => {
      this.setState({
        photoUrl,
        disable: false,
      })
    })
    .catch((error) => console.log(error))
  }

  render() {
    const { disable } = this.state
    return (
      <div className="container py-5">
        <h1 className="display-4">Add your recipe</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Recipe name" type="text" className="form-control" value={this.state.name} onChange={(e) => this.handleChange(e)} autoComplete="off" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" cols="40" rows="5" aria-describedby="descriptionHelpBlock" required className="form-control" value={this.state.description} onChange={(e) => this.handleChange(e)}></textarea>
            <span id="descriptionHelpBlock" className="form-text text-muted">Provide a description of the recipe.</span>
          </div>
          <div className="form-group">
            <label htmlFor="photo">Upload recipe photo</label>
            <input type="file" className="form-control-file" id="photo" onChange={this.fileOnchange} />
          </div>
          <div className="form-row">
            <div className="col">
              <label htmlFor="duration">Duration</label>
              <input id="duration" name="duration" type="text" required className="form-control" value={this.state.duration} onChange={(e) => this.handleChange(e)} placeholder="Enter a value in minutes" autoComplete="off" />
            </div>
            <div className="col">
              <label htmlFor="servings">Servings</label>
              <input id="servings" name="servings" type="text" required className="form-control" value={this.state.servings} onChange={(e) => this.handleChange(e)} placeholder="E.g. number of people this would serve" autoComplete="off" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="ingredients_1">Ingredients</label>
            {
              this.state.ingredients.map((ingredient, index) => {
                return (
                  <div className="form-row" key={index}>
                    <div className="col col-md-9">
                      <input className="form-control" onChange={(e) => this.handleItemChange(e, index)} value={ingredient.name} name="name" placeholder="Ingredient name" autoComplete="off" />
                    </div>
                    <div className="col">
                      <input className="form-control" onChange={(e) => this.handleItemChange(e, index)} value={ingredient.quantity} name="quantity" placeholder="Quantity required" autoComplete="off" />
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-warning" onClick={(e) => this.handleItemRemove(e, index)}><i className="far fa-trash-alt"></i></button>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={(e) => this.addItem(e)}><i className="fas fa-plus"></i> Add ingredient</button>
          </div>
          <div className="form-group">
            <label htmlFor="instructions_!">Instructions</label>
            {
              this.state.instructions.map((instruction, index) => {
                return (
                  <div className="form-row" key={index}>
                    <div className="col">
                      <textarea className="form-control" onChange={(e) => this.handleInstructionChange(e, index)} value={instruction}></textarea>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-warning" onClick={(e) => this.handleInstructionRemove(e, index)}><i className="far fa-trash-alt"></i></button>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={(e) => this.addInstruction(e)}><i className="fas fa-plus"></i> Add instruction</button>
          </div>
          <div className="form-group">
            {disable ? <button name="submit" type="submit" className="btn btn-success" disabled><i className="fas fa-cloud-upload-alt"></i> Save recipe</button> : <button name="submit" type="submit" className="btn btn-success" onClick={(e) => this.handleSubmit(e)}><i className="fas fa-cloud-upload-alt"></i> Save recipe</button>}
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(Recipes);
