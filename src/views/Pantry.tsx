import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { withAuth, WithAuthProps } from '../lib/AuthProvider';
import user from '../lib/user-service';
import recipe from '../lib/recipe-service';
import { PantryItem, Recipe } from '../types';

interface RecipeMatch {
	_id: {
		_id: string;
		name: string;
		description: string;
		photoUrl: string;
	};
	matches: number;
}

function Pantry(props: WithAuthProps): React.ReactElement {
	const [pantry, setPantry] = useState<PantryItem[]>([]);
	const [recipes, setRecipes] = useState<RecipeMatch[]>([]);
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
	const [performSearch, setPerformSearch] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(true);
	const myRef = useRef<HTMLDivElement>(null);

	function handleItemChange(e: React.ChangeEvent<HTMLInputElement>, inputIndex: number): void {
		const newPantry = [...pantry];
		newPantry[inputIndex][e.target.name as keyof PantryItem] = e.target.value;
		setPantry(newPantry);
	}

	function handleItemRemove(e: React.MouseEvent<HTMLButtonElement>, index: number): void {
		e.preventDefault();
		const newPantry = [...pantry];
		newPantry.splice(index, 1);
		setPantry(newPantry);
	}

	function addItem(e: React.MouseEvent<HTMLButtonElement>): void {
		e.preventDefault();
		setPantry([...pantry, { name: '', quantity: '' }]);
	}

	function handleSubmit(e: React.MouseEvent<HTMLButtonElement>): void {
		e.preventDefault();
		if (!props.user) return;
		const { _id } = props.user;
		user.updatePantry(_id, pantry)
			.then((response) => {
				setPantry(response.pantry || []);
			})
			.catch((error) => console.log(error));
	}

	function handleSearchByIngredients(e: React.MouseEvent<HTMLButtonElement>): void {
		e.preventDefault();
		recipe.recipesByAllIngredients(
			selectedIngredients.map((ingredient) => ({ name: ingredient, quantity: '' }))
		)
			.then((data: Recipe[]) => {
				const recipesWithMatches: RecipeMatch[] = data.map((recipe) => ({
					_id: recipe,
					matches: selectedIngredients.length,
				}));
				setRecipes(recipesWithMatches);
				setPerformSearch(true);
			})
			.catch((error) => console.log(error));
	}

	function handleCheckChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const ingredientName = e.target.name;
		if (!selectedIngredients.includes(ingredientName)) {
			setSelectedIngredients([...selectedIngredients, ingredientName]);
			setDisabled(false);
		} else {
			const newSelectedIngredients = selectedIngredients.filter(
				(item) => item !== ingredientName
			);
			setSelectedIngredients(newSelectedIngredients);
			if (newSelectedIngredients.length === 0) {
				setDisabled(true);
			}
		}
	}

	useEffect(() => {
		if (props.user) {
			user.getUser(props.user._id)
				.then((data) => {
					setPantry(data.pantry || []);
				})
				.catch((error) => console.log(error));
		}
	}, [props.user]);

	useEffect(() => {
		if (myRef.current) {
			window.scrollTo(0, myRef.current.offsetTop);
		}
	}, [recipes]);

	return (
		<div className='container p-0'>
			{pantry.map((item, index) => (
				<div className='form-row' key={index} ref={myRef}>
					<div className='col col-md-8'>
						<input
							className='form-control'
							onChange={(e) => handleItemChange(e, index)}
							value={item.name}
							name='name'
							placeholder='Item name'
							autoComplete='off'
						/>
					</div>
					<div className='col'>
						<input
							className='form-control'
							onChange={(e) => handleItemChange(e, index)}
							value={item.quantity}
							name='quantity'
							placeholder='Quantity'
							autoComplete='off'
						/>
					</div>
					<div className='col-1'>
						<input
							className='form-control'
							type='checkbox'
							name={item.name}
							onChange={handleCheckChange}
						/>
					</div>
					<div className='col-auto'>
						<button
							className='btn btn-warning'
							onClick={(e) => handleItemRemove(e, index)}
						>
							<i className='far fa-trash-alt'></i>
						</button>
					</div>
				</div>
			))}
			<div className='form-row'>
				<div className='col-auto'>
					<button
						className='btn btn-outline-primary'
						type='submit'
						onClick={addItem}
					>
						<i className='fas fa-plus'></i> Add item
					</button>
				</div>
				<div className='col-auto'>
					<button
						className='btn btn-success'
						type='submit'
						onClick={handleSubmit}
					>
						<i className='fas fa-cloud-upload-alt'></i> Save items
					</button>
				</div>
			</div>
			<div className='form-row'>
				<div className='col'>
					<button
						className='btn btn-primary'
						type='submit'
						onClick={handleSearchByIngredients}
						disabled={disabled}
					>
						<span className='badge badge-light'>
							{selectedIngredients.length}
						</span>{' '}
						ingredient{selectedIngredients.length !== 1 ? 's' : null}{' '}
						selected
					</button>
				</div>
			</div>
			{performSearch ? (
				<h2>
					{recipes.length} recipe{recipes.length !== 1 ? 's use the selected ingredients' : ' uses the selected ingredient'}
				</h2>
			) : null}
			{recipes.map((recipe) => (
				<div className='card mb-3' key={recipe._id._id}>
					<div className='row no-gutters'>
						<div className='col-md-4'>
							<img
								src={recipe._id.photoUrl}
								className='card-img'
								alt={recipe._id.name}
								loading='lazy'
							/>
						</div>
						<div className='col-md-8'>
							<div className='card-body'>
								<h5 className='card-title'>
									<Link
										to={{ pathname: `/recipes/${recipe._id._id}` }}
									>
										{recipe._id.name}
									</Link>{' '}
									<span className='badge badge-info'>
										{recipe.matches} ingredient{recipe.matches > 1 ? 's' : null} matched
									</span>
								</h5>
								<p className='card-text'>{recipe._id.description}</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default withAuth(Pantry);
