import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types';

interface FeaturedRecipeCardProps {
	recipe: Recipe;
}

const FeaturedRecipeCard: React.FC<FeaturedRecipeCardProps> = ({ recipe }: FeaturedRecipeCardProps) => {
	const [recipeState] = useState<Recipe>(recipe);
	const { _id, name, description, photoUrl, updated_at } = recipeState;

	const timeAgo = (date: Date): string => {
		const diff = Date.now() - date.getTime();
		const minutes = Math.floor(diff / 60000);
		if (minutes < 60) return `${minutes} minutes ago`;
		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours} hours ago`;
		const days = Math.floor(hours / 24);
		return `${days} days ago`;
	};

	return (
		<div className='card'>
			<Link to={`/recipes/${_id}`} state={{ selectedRecipe: recipeState }}>
				<img src={photoUrl} className='card-img-top' alt={name} loading='lazy' />
				<div className='card-body'>
					<h5 className='card-title'>
						{name}
					</h5>
					<p className='card-text text-body'>{description}</p>
					<p className='card-text'><small className='text-muted'>Last updated {timeAgo(new Date(updated_at))}</small></p>
				</div>
			</Link>
		</div>
	);
};

export default FeaturedRecipeCard;
