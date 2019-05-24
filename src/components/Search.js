import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const axios = require('axios');
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
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

  render() {
    return (
      <div>
        <form>
          <input type="text" autoFocus name="searchTerm" value={this.state.searchTerm} placeholder="Find a recipe" onChange={(e) => this.handleSearch(e)} />
        </form>
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

export default Search;
