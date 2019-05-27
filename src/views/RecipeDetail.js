import React, { Component } from "react";
import { withAuth } from './../lib/AuthProvider';
import recipe from '../lib/recipe-service';

class RecipeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: this.props.match.params.id,
      hasRecipe: false,
      editable: false,
      editing: false
    }
  }

  handleSaveRecipe(e) {
    e.preventDefault();
    const recipeId = this.state.recipe._id;
    const userId = this.props.user._id;
    recipe.saveRecipe({
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
    const { _id, creatorId, name, description, photoUrl, duration, ingredients, instructions, servings } = this.state;
    recipe.updateRecipe({
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
      .then((response) => this.setState({ editing: false }))
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    recipe.getRecipeById(this.state._id)
      .then((response) => {
        const { creatorId, name, description, photoUrl, duration, ingredients, instructions, servings } = response
        this.setState({
          creatorId,
          name,
          description,
          photoUrl,
          duration,
          ingredients,
          instructions,
          servings,
          hasRecipe: true
        })
        if (this.props.user._id === this.state.creatorId) {
          this.setState({
            editable: true
          })
        }
      })
      .catch((error) => console.log(error))    
  }

  render() {
    console.log(this.state);
    return (
      !this.state.hasRecipe ? null :
        <div className="container pt-5">
          <h1 className="display-4">{this.state.name}</h1>
          <div className="form-row">
          {this.state.editable ? <button className="btn btn-secondary" type="submit" onClick={(e) => this.handleEditRecipe(e)}>Edit recipe</button> : null}
          <button className="btn btn-secondary" type="submit" onClick={(e) => this.handleSaveRecipe(e)}>Save recipe</button>
          </div>
          {!this.state.editing ?
            <>
              <p className="lead">{this.state.description}</p>
              <p>Duration: {this.state.duration} minutes</p>
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
            <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Recipe name" type="text" required="required" className="form-control" value={this.state.name} onChange={(e) => this.handleChange(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" cols="40" rows="5" aria-describedby="descriptionHelpBlock" required="required" className="form-control" value={this.state.description} onChange={(e) => this.handleChange(e)}></textarea>
            <span id="descriptionHelpBlock" className="form-text text-muted">Provide a description of the recipe.</span>
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input id="duration" name="duration" type="text" required="required" className="form-control" value={this.state.duration} onChange={(e) => this.handleChange(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="servings">Servings</label>
            <input id="servings" name="servings" type="text" required="required" className="form-control" value={this.state.servings} onChange={(e) => this.handleChange(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients_1">Ingredients</label>
            {
              this.state.ingredients.map((ingredient, index) => {
                return (
                  <div className="form-row" key={index}>
                    <div className="col">
                      <input className="form-control" onChange={(e) => this.handleItemChange(e, index)} value={ingredient.name} name="name" />
                    </div>
                    <div className="col">
                      <input className="form-control" onChange={(e) => this.handleItemChange(e, index)} value={ingredient.quantity} name="quantity" />
                    </div>
                    <div className="col">
                      <button className="btn btn-warning" onClick={(e) => this.handleItemRemove(e, index)}>Remove</button>
                    </div>
                  </div>
                )
              })
            }
            </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={(e) => this.addItem(e)}>Add ingredient</button>
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
                    <div className="col">
                      <button className="btn btn-warning" onClick={(e) => this.handleInstructionRemove(e, index)}>Remove</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={(e) => this.addInstruction(e)}>Add instruction</button>
              </div>
              <div className="form-row">
                <div className="col">
                  <button type="submit" className="btn btn-danger" onClick={(e) => this.handleEditRecipe(e)}>Cancel changes</button>
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-success" onClick={(e) => this.handleSubmit(e)}>Save recipe</button>
                </div>
              </div>
            </form>
          }
        </div>
    );
  }
}

export default withAuth(RecipeDetail);