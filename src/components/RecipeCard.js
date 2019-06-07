import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class RecipeCard extends Component {
  state = {
    recipe: this.props.recipe
  }
  render() {
    const { _id, name, description, photoUrl } = this.state.recipe;
    return (
      <div className="card mb-3">
        <Link to={{
          pathname: `/recipes/${_id}`,
          state: { selectedRecipe: this.state.recipe }
        }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={photoUrl} className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {name}
                </h5>
                <p className="card-text text-body">{description}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default RecipeCard;
