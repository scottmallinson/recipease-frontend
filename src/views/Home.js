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

        <div className="jumbotron bg-light vw-100 vh-100 d-flex align-items-center">
          <div className="container">
            <h1 className="display-4">Recipease</h1>
            <p className="lead">Recipes for the time conscious.</p>
            <hr className="my-4" />
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <Search pantry={this.state.pantry} />
          </div>
        </div>
        <h2>Latest recipes</h2>
        {this.state.recipes.map((recipe) =>
          <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src="..." className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  <Link key={recipe._id} to={{
            pathname: `/recipes/${recipe._id}`,
            state: { selectedRecipe: recipe }
          }}>{recipe.name}</Link>
                </h5>
                <p className="card-text">{recipe.description}</p>
                <p className="card-text"><small className="text-muted">Last updated {recipe.updated_at}</small></p>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default withAuth(Home);
