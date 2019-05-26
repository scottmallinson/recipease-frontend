import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Search from "./..//components/Search";
import { withAuth } from './../lib/AuthProvider';
import recipe from '../lib/recipe-service';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      pantry: []
    }
  }

  componentDidMount() {
    recipe.getAllRecipes()
      .then((data) => {
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
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </Link>
        )}
      </div>
    );
  }
}

export default withAuth(Home);
