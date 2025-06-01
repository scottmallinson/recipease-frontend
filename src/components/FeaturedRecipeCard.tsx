import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Recipe } from '../types';

interface FeaturedRecipeCardProps {
	recipe: Recipe;
}

const FeaturedRecipeCard: React.FC<FeaturedRecipeCardProps> = ({ recipe }: FeaturedRecipeCardProps) => {
	const [recipeState] = useState<Recipe>(recipe);
	const { _id, name, description, photoUrl, updated_at } = recipeState;
	return (
		<div className='card'>
			<Link to={`/recipes/${_id}`} state={{ selectedRecipe: recipeState }}>
				<img src={photoUrl} className='card-img-top' alt={name} loading='lazy' />
				<div className='card-body'>
					<h5 className='card-title'>
						{name}
					</h5>
					<p className='card-text text-body'>{description}</p>
					<p className='card-text'><small className='text-muted'>Last updated {moment(updated_at).fromNow()}</small></p>
				</div>
			</Link>
		</div>
	);
};

export default FeaturedRecipeCard;
