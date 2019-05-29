import React, { Component } from "react";
import { Link } from 'react-router-dom';
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

  componentDidUpdate(_, prevState) {
    if (this.state.recipes.length > prevState.recipes.length) {
      window.scroll(0, document.body.clientHeight);
    }
  }

  handleCheckChange = (e) => {
    let positionInArray = null;
    if (!this.state.selectedIngredients.includes(e.target.name)) {
      this.state.selectedIngredients.push(e.target.name)
    } else {
      positionInArray = this.state.selectedIngredients.indexOf(e.target.name)
      this.state.selectedIngredients.splice(positionInArray, 1)
    }
    if (this.state.selectedIngredients.length > 0) {
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
      <div className="container p-0">
        {
          this.state.pantry.map((item, index) => {
            return (
              <div className="form-row" key={index}>
                <div className="col">
                  <input className="form-control" onChange={(e) => this.handleItemChange(e, index)} value={item.item} name="item" placeholder="Item name" autoComplete="off" />
                </div>
                <div className="col">
                  <input className="form-control" onChange={(e) => this.handleItemChange(e, index)} value={item.quantity} name="quantity" placeholder="Quantity" autoComplete="off" />
                </div>
                <div className="col">
                  <input className="form-control" type="checkbox" name={item.item} onChange={(e) => this.handleCheckChange(e, index)} />
                </div>
                <div className="col">
                  <button className="btn btn-warning" onClick={(e) => this.handleItemRemove(e, index)}><i className="far fa-trash-alt"></i></button>
                </div>
              </div>
            )
          })
        }
        <div className="form-row">
          <div className="col-auto">
            <button className="btn btn-outline-primary" type="submit" onClick={(e) => this.addItem(e)}><i className="fas fa-plus"></i> Add item</button>
          </div>
          <div className="col-auto">
            <button className="btn btn-success" type="submit" onClick={(e) => this.handleSubmit(e)}><i class="fas fa-cloud-upload-alt"></i> Save items</button>
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <button className="btn btn-primary" type="submit" onClick={(e) => this.handleSearchByIngredients(e)} disabled={this.state.searchIngredients}><span className="badge badge-light">{this.state.selectedIngredients.length}</span> ingredients selected</button>
          </div>
        </div>
        {this.state.performSearch ?
          <h2>{this.state.recipes.length} recipes uses the selected ingredients</h2>
          : null}
        {this.state.recipes.map((recipe) =>
          <div className="card mb-3" key={recipe._id._id}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={recipe._id.photoUrl} className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={{
                      pathname: `/recipes/${recipe._id._id}`
                    }}>{recipe._id.name}</Link> <span className="badge badge-info">{recipe.matches} ingredients matched</span>
                  </h5>
                  <p className="card-text">{recipe._id.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Pantry);
