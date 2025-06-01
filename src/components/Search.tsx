import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import recipe from '../lib/recipe-service';
import { Recipe } from '../types';

function Search(): React.ReactElement {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	function handleSearch(e: React.ChangeEvent<HTMLInputElement>): void {
		const { value } = e.target;
		setSearchTerm(value);
		recipe.search(e.target.value)
			.then((data: Recipe[]) => {
				setRecipes(data);
			})
			.catch((error) => console.log(error));
	}

	return (
		<div>
			<form>
				<input className='form-control' type='text' autoFocus autoComplete='off' name='searchTerm' value={searchTerm} placeholder='Find a recipe' onChange={handleSearch} />
			</form>
			<ul className='list-unstyled pt-2'>
				{recipes.map((recipe: Recipe) => (
					<li className='media mt-2' key={recipe._id}>
						<img src={recipe.photoUrl} className='mr-3' width='100' alt={recipe.name} loading='eager' />
						<div className='media-body'>
							<h5 className='mt-0 mb-1'><Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link></h5>
							{recipe.description}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default withAuth(Search);
