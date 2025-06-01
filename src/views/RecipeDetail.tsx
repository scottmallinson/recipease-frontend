import React, { useState, useEffect } from 'react';
import { withAuth, WithAuthProps } from './../lib/AuthProvider';
import { Helmet } from 'react-helmet';
import recipe from '../lib/recipe-service';
import { Recipe } from '../types';

interface RecipeDetailProps extends WithAuthProps {
	id: string;
}

function RecipeDetail(props: RecipeDetailProps): React.ReactElement {
	const { id } = props;
	const [recipeData, setRecipeData] = useState<Recipe | null>(null);
	const [saved, setSaved] = useState<boolean | null>(null);

	useEffect(() => {
		recipe.getRecipeById(id)
			.then((data: Recipe) => {
				setRecipeData(data);
			})
			.catch((error: unknown) => console.log(error));
	}, [id]);

	function handleSaveRecipe(): void {
		if (!props.user || !recipeData) return;
		const saveRequest = {
			recipeId: recipeData._id,
			userId: props.user._id,
		};
		recipe.saveRecipe(saveRequest)
			.then(() => setSaved(true))
			.catch((error: unknown) => console.log(error));
	}

	if (!recipeData) return <div>Loading...</div>;

	return (
		<>
			<Helmet>
				<title>{recipeData.name} &middot; Recipease</title>
				<meta name='description' content={recipeData.description} />
				<meta property='og:type' content='article' />
			</Helmet>
			<div className='container py-5'>
				<h1 className='display-4'>{recipeData.name}</h1>
				<p>{recipeData.description}</p>
				<button
					className='btn btn-primary'
					onClick={handleSaveRecipe}
					disabled={saved === true}
				>
					{saved ? 'Saved' : 'Save Recipe'}
				</button>
			</div>
		</>
	);
}

export default withAuth(RecipeDetail);