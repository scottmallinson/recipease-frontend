import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withAuth } from "../lib/AuthProvider";
import recipe from '../lib/recipe-service';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      recipes: []
    }
  }

  handleFocus = (e) => {

  }

  handleSearch = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    recipe.search(e.target.value)
      .then((data) => {
        this.setState({ recipes: data })
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <form>
          <input className="form-control" type="text" autoFocus name="searchTerm" value={this.state.searchTerm} placeholder="Find a recipe" onChange={(e) => this.handleSearch(e)} />
        </form>

        <ul className="list-unstyled">
          {this.state.recipes.map((recipe) =>
            <li className="media mt-2" key={recipe._id}>
              <img src={`https://source.unsplash.com/64x64/?${recipe.name}`} className="mr-3" alt="..." />
              <div className="media-body">
                <h5 className="mt-0 mb-1"><Link to={{
                  pathname: `/recipes/${recipe._id}`,
                  state: { selectedRecipe: recipe }
                }}>{recipe.name}</Link></h5>
                {recipe.description}
              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default withAuth(Search);
