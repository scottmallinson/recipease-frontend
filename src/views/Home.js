import React from "react";
import Search from "./../components/Search";
import FeaturedRecipeCard from "./../components/FeaturedRecipeCard";
import { withAuth } from './../lib/AuthProvider';
import recipe from '../lib/recipe-service';
import { useState, useEffect } from "react";

function Home() {
  const [numRecipes, setNumRecipes] = useState(0);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    recipe.getAllRecipes()
      .then((data) => {
        setNumRecipes(data.length)
        setRecipes(data.reverse().slice(0, 3))
      })
      .catch((error) => console.log(error))
  })

  return (
    <div>
      <div className="jumbotron bg-light vw-100 d-flex align-items-center">
        <div className="container">
          <h1 className="display-4">Recipease</h1>
          <p className="lead">Recipes for the time conscious.</p>
          <hr className="my-4" />
          <p>Search our vast database of <strong>{numRecipes}</strong> recipes by name or ingredient.</p>
          <Search />
        </div>
      </div>
      <div className="container pb-5 mb-3">
        <h2>Freshest recipes</h2>
        <div className="card-deck">
          {recipes.map((recipe) =>
            <FeaturedRecipeCard key={recipe._id} recipe={recipe} />
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(Home);
