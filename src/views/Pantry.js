import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Search from "./..//components/Search";
import { withAuth } from "../lib/AuthProvider";
import user from '../lib/user-service';
import recipe from '../lib/recipe-service';

class Pantry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pantry: [],
      recipes: [],
      selectedIngredients: [],
      performSearch: false,
      searchIngredients: true
    }
  }

  handleItemChange(e, inputIndex) {
    const { pantry } = this.state;
    let newPantry = [...pantry];
    newPantry.map((_, index, newPantry) => {
      return index === inputIndex ? newPantry[index][e.target.name] = e.target.value : null;
    })
    this.setState({
      pantry: newPantry,
    })
  }

  handleItemRemove(e, index) {
    e.preventDefault();
    this.state.pantry.splice(index, 1);
    this.setState({
      pantry: this.state.pantry
    })
  }

  addItem(e, items) {
    e.preventDefault();
    this.setState({
      pantry: [...this.state.pantry, {
        item: '',
        quantity: ''
      }]
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { _id } = this.props.user;
    const { pantry } = this.state;
    user.updatePantry({
      _id,
      pantry
    })
      .then((response) => {
        this.setState({
          pantry: response.pantry
        })
      })
      .catch((error) => console.log(error));
  }

  handleLucky = (e) => {
    e.preventDefault();
    const searchForItems = this.state.pantry;
    const ingredients = searchForItems.map((items) => items.item);
    recipe.recipesByAllIngredients({
      ingredients
    })
      .then((data) => {
        this.setState({ recipes: data })
      })
      .catch((error) => console.log(error));
  }

  handleSearchByIngredients = (e) => {
    e.preventDefault();
    const searchForItems = this.state.selectedIngredients
    recipe.recipesByAllIngredients({
      searchForItems
    })
      .then((data) => {
        this.setState({ recipes: data, performSearch: true })
      })
      .catch((error) => console.log(error));
  }

  handleCheckChange = (e) => {
    let positionInArray = null;
    if (!this.state.selectedIngredients.includes(e.target.name)) {
      this.state.selectedIngredients.push(e.target.name)
    } else {
      positionInArray = this.state.selectedIngredients.indexOf(e.target.name)
      this.state.selectedIngredients.splice(positionInArray, 1)
    }
    if (this.state.selectedIngredients.length > 0){
      this.setState({ searchIngredients: false })
    } else {
      this.setState({ searchIngredients: true })
    }
  }

  componentDidMount() {
    user.getUser(this.props.user._id)
      .then((data) => {
        this.setState({
          pantry: data.pantry
        })
      })
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <div className="container pt-5">
        <Search pantry={this.state.pantry} />
        <h1 className="display-4">Welcome {this.props.user.username}</h1>
        <p>This is your pantry</p>
        {
          this.state.pantry.map((item, index) => {
            return (
              <div className="form-row" key={index}>
                <div className="col">
                  <input className="form-control" onChange={(e) => this.handleItemChange(e, index)} value={item.item} name="item" />
                </div>
                <div className="col">
                  <input className="form-control" onChange={(e) => this.handleItemChange(e, index)} value={item.quantity} name="quantity" />
                </div>
                <div className="col">
                  <input className="form-control" type="checkbox" name={item.item} onChange={(e) => this.handleCheckChange(e, index)} />
                </div>
                <div className="col">
                  <button className="btn btn-warning" onClick={(e) => this.handleItemRemove(e, index)}>Remove</button>
                </div>
              </div>
            )
          })
        }
        <div className="form-row">
          <div className="col">
            <button className="btn btn-primary" type="submit" onClick={(e) => this.addItem(e)}>Add item</button>
          </div>
          <div className="col">
            <button className="btn btn-success" type="submit" onClick={(e) => this.handleSubmit(e)}>Save items</button>
          </div>
          {/* <button onClick={(e) => this.handleLucky(e)}>Find a recipe with pantry ingredients</button> */}
        </div>
        <div className="form-row">
          <div className="col">
            <button className="btn btn-primary" type="submit" onClick={(e) => this.handleSearchByIngredients(e)} disabled={this.state.searchIngredients}>Find a recipe with the selected ingredients</button>
          </div>
        </div>
        {this.state.performSearch ?
        <h2>{this.state.recipes.length} recipes uses the selected ingredients</h2>
        : null }
        {this.state.recipes.map((recipe) => {
          return (
            <Link key={recipe._id._id} to={{
              pathname: `/recipes/${recipe._id._id}`
            }}>
              <h2>{recipe._id.name}</h2>
              <p>{recipe._id.description}</p>
            </Link> )
            }
          )}
      </div>
    );
  }
}

export default withAuth(Pantry);
