import React from "react";
import { withAuth } from "../lib/AuthProvider";
import { Helmet } from 'react-helmet';
import user from '../lib/user-service';
import Pantry from "./Pantry";
import RecipeCard from "./../components/RecipeCard";
import { useState, useEffect } from "react";

function Profile(props) {
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    user.getUser(props.user._id)
      .then((data) => {
        setCreatedRecipes(data.createdRecipes)
        setSavedRecipes(data.savedRecipes)
      })
      .catch((error) => console.log(error))
  })

  return (
    <>
      <Helmet>
        <title>Your profile &middot; Recipease</title>
        <meta name="description" content="View your pantry, created, and saved recipes" />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="container py-5">
        <h1 className="display-4 text-wrap text-break">Hi, {props.user.username}</h1>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active" id="nav-pantry-tab" data-toggle="tab" href="#nav-pantry" role="tab" aria-controls="nav-pantry" aria-selected="false">Pantry</a>
            <a className="nav-item nav-link" id="nav-created-tab" data-toggle="tab" href="#nav-created" role="tab" aria-controls="nav-created" aria-selected="true">Created recipes</a>
            <a className="nav-item nav-link" id="nav-saved-tab" data-toggle="tab" href="#nav-saved" role="tab" aria-controls="nav-saved" aria-selected="false">Saved recipes</a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active pt-3" id="nav-pantry" role="tabpanel" aria-labelledby="nav-pantry-tab">
            <Pantry />
          </div>
          <div className="tab-pane fade pt-3" id="nav-created" role="tabpanel" aria-labelledby="nav-created-tab">
            {createdRecipes.map((recipe) =>
              <RecipeCard key={recipe._id} recipe={recipe} />
            )}
          </div>
          <div className="tab-pane fade pt-3" id="nav-saved" role="tabpanel" aria-labelledby="nav-saved-tab">
            {savedRecipes.map((recipe) =>
              <RecipeCard key={recipe._id} recipe={recipe} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Profile);
