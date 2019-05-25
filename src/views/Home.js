import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Search from "./..//components/Search";
import { withAuth } from './../lib/AuthProvider';
const axios = require("axios");

class Home extends Component {
  constructor(props){
    const pantryContents = (pantryItems) => { 
      return pantryItems.map((item) => item.item )
    } 
    super(props)
    this.state = {
      recipes: [],
      pantry: pantryContents(this.props.user.pantry)
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/recipes/')
    .then(({ data }) => {
      this.setState({
        recipes: data
      })
    })
    .catch((error) => console.log(error)) 
  }

  render() {
    return (
      <div>
        <Search pantry={this.state.pantry} />
        <h1>Home</h1>
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
    );
  }
}

export default withAuth(Home);
