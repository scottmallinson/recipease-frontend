import React, { Component } from 'react'
import { Link } from 'react-router-dom';
const moment = require('moment');

class FeaturedRecipeCard extends Component {
  state = {
    recipe: this.props.recipe
  }
  render() {
    const { _id, name, description, photoUrl, updated_at } = this.state.recipe;
    return (
      <div className="card">
        <Link to={{
          pathname: `/recipes/${_id}`,
          state: { selectedRecipe: this.state.recipe }
        }}>
          <img src={photoUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {name}
            </h5>
            <p className="card-text text-body">{description}</p>
            <p className="card-text"><small className="text-muted">Last updated {moment(updated_at).fromNow()}</small></p>
          </div>
        </Link>
      </div>
    )
  }
}

export default FeaturedRecipeCard;
