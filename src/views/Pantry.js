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
      pantry: this.props.user.pantry,
      recipes: []
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
          pantry: response.data.pantry
        })
      })
      .catch((error) => console.log(error));
  }

  handleLucky = (e) => {
    e.preventDefault();
    const searchForItems = this.state.pantry;
    recipe.recipesByAllIngredients({
      searchForItems
    })
      .then(({ data }) => {
        this.setState({ recipes: data })
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate() {
    console.log(this.state.pantry);
  }

  render() {
    return (
      <div>
        <h2>Pantry.js</h2>
        <Search pantry={this.state.pantry} />
        <h1>Welcome {this.props.user.username}</h1>
        <p>This is your pantry</p>
        {
          this.state.pantry.map((item, index) => {
            return (
              <div key={index}>
                <input onChange={(e) => this.handleItemChange(e, index)} value={item.item} name="item" />
                <input onChange={(e) => this.handleItemChange(e, index)} value={item.quantity} name="quantity" />
                <button onClick={(e) => this.handleItemRemove(e, index)}>Remove</button>
              </div>
            )
          })
        }
        <button onClick={(e) => this.addItem(e)}>Add item</button>
        <button onClick={(e) => this.handleSubmit(e)}>Save items</button>
        <button onClick={(e) => this.handleLucky(e)}>Find a recipe with pantry ingredients</button>
        {this.state.recipes.map((recipe) => {
          return (
            <Link key={recipe._id._id} to={{
              pathname: `/recipes/${recipe._id._id}`,
              state: { selectedRecipe: recipe._id }
            }}>
              <h1>{recipe._id.name}</h1>
              <p>{recipe._id.description}</p>
            </Link>)
        }
        )}
      </div>
    );
  }
}

export default withAuth(Pantry);
