import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from "react";
const moment = require('moment');

function FeaturedRecipeCard(props) {
  const [recipe] = useState(props.recipe);
  const { _id, name, description, photoUrl, updated_at } = recipe;
  return (
    <div className="card">
      <Link to={{
        pathname: `/recipes/${_id}`,
        state: { selectedRecipe: recipe }
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

export default FeaturedRecipeCard;
