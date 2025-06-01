import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../lib/AuthProvider';
import { Helmet } from 'react-helmet';
import recipe from '../lib/recipe-service';
import Search from './../components/Search';
import RecipeCard from './../components/RecipeCard';
import { Recipe } from '../types';

function Recipes(): React.ReactElement {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		recipe.getAllRecipes()
			.then((data: Recipe[]) => {
				setRecipes(data);
			})
			.catch((error: unknown) => console.log(error));
	}, []);

	return (
		<>
			<Helmet>
				<title>Recipes &middot; Recipease</title>
				<meta name='description' content='Search our database by recipe name or ingredient' />
				<meta property='og:type' content='article' />
			</Helmet>
			<div className='container py-5'>
				<h1 className='display-4'>Recipes</h1>
				<div className='jumbotron bg-light d-flex align-items-center'>
					<div className='container'>
						<p className='lead'>Search our database by recipe name or ingredient.</p>
						<Search />
						<hr className='my-4' />
						<Link className='form-control btn btn-outline-secondary' to='/recipes/create'>Contribute a recipe</Link>
					</div>
				</div>
				{recipes.map((recipe) => (
					<RecipeCard key={recipe._id} recipe={recipe} />
				))}
			</div>
		</>
	);
}

export default withAuth(Recipes);