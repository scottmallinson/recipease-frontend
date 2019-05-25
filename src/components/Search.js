import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withAuth } from "../lib/AuthProvider";
const axios = require('axios');
class Search extends Component {
  constructor(props) {
    const pantryContents = (pantryItems) => { 
      return pantryItems.map((item) => item.item )
    } 
    super(props)
    this.state = {
      searchTerm: '',
      pantry: pantryContents(this.props.pantry),
      recipes: []
    }
  }

  handleSearch = (e) => {  
    const {name, value} = e.target;
    this.setState({[name]: value});
    axios.get(`http://localhost:5000/recipes/search?s=${e.target.value}`)
      .then(({ data }) => {
        this.setState({recipes: data})
      })
      .catch((error) => console.log(error));
  }

  handleLucky = (e) => {
    e.preventDefault();
    const searchForItems = this.state.pantry;
    axios.post('http://localhost:5000/recipes/search', {
      searchForItems
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" autoFocus name="searchTerm" value={this.state.searchTerm} placeholder="Find a recipe" onChange={(e) => this.handleSearch(e)} />
        </form>
        {this.props.isLoggedin ?
        <button onClick={(e) => this.handleLucky(e)}>I'm feeling lucky</button>
        :
        null }
        {this.state.recipes.map((recipe) => 
          <Link key={recipe._id} to={{
            pathname: `/recipes/${recipe._id}`,
            state: { selectedRecipe: recipe }
          }}>
            <h1>{recipe.name}</h1>
            <p>{recipe.description}</p>
          </Link>
        )}
      </div>
    )
  }
}

export default withAuth(Search);
