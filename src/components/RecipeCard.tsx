import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types';

interface RecipeCardProps {
	recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps): React.ReactElement {
	const [recipeState] = useState<Recipe>(recipe);
	const { _id, name, description, photoUrl } = recipeState;
	return (
		<div className='card mb-3'>
			<Link to={`/recipes/${_id}`} state={{ selectedRecipe: recipeState }}>
				<div className='row no-gutters'>
					<div className='col-md-4'>
						<img src={photoUrl} className='card-img' alt={name} loading='lazy' />
					</div>
					<div className='col-md-8'>
						<div className='card-body'>
							<h5 className='card-title'>
								{name}
							</h5>
							<p className='card-text text-body'>{description}</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default RecipeCard;
