import React, { useState } from 'react';
import { withAuth, WithAuthProps } from '../lib/AuthProvider';
import recipe from '../lib/recipe-service';
import { Ingredient } from '../types';

interface RecipeCreateState {
	name: string;
	description: string;
	photoUrl: string;
	duration: string;
	ingredients: Ingredient[];
	instructions: string[];
	servings: string;
	disable: boolean;
}

function RecipeCreate(props: WithAuthProps): React.ReactElement {
	const [state, setState] = useState<RecipeCreateState>({
		name: '',
		description: '',
		photoUrl: '',
		duration: '',
		ingredients: [{ name: '', quantity: '' }],
		instructions: [],
		servings: '',
		disable: true,
	});

	function handleItemChange(e: React.ChangeEvent<HTMLInputElement>, inputIndex: number): void {
		const newIngredients = [...state.ingredients];
		newIngredients[inputIndex][e.target.name as keyof Ingredient] = e.target.value;
		setState((prevState) => ({ ...prevState, ingredients: newIngredients }));
	}

	function handleFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		const recipeData = {
			...state,
			creatorId: props.user?._id || '',
		};
		recipe.createRecipe(recipeData)
			.then(() => console.log('Recipe created successfully'))
			.catch((error: unknown) => console.log(error));
	}

	function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>): void {
		e.preventDefault();
		setState((prevState) => ({
			...prevState,
			ingredients: [...prevState.ingredients, { name: '', quantity: '' }],
		}));
	}

	return (
		<div className='container py-5'>
			<h1 className='display-4'>Create Recipe</h1>
			<form onSubmit={handleFormSubmit}>
				<div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Recipe name" type="text" className="form-control" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} autoComplete="off" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
		id="description"
		name="description"
		cols={40}
		rows={5}
		aria-describedby="descriptionHelpBlock"
		required
		className="form-control"
		value={state.description}
		onChange={(e) => setState({ ...state, description: e.target.value })}
	></textarea>
            <span id="descriptionHelpBlock" className="form-text text-muted">Provide a description of the recipe.</span>
          </div>
          <div className="form-group">
            <label htmlFor="photo">Upload recipe photo</label>
            <input type="file" className="form-control-file" id="photo" onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) {
								const uploadData = new FormData();
								uploadData.append('recipease', file);
								recipe.uploadRecipeImage(uploadData)
									.then((photoUrl) => {
										setState((prevState) => ({
											...prevState,
											photoUrl,
											disable: false,
										}));
									})
									.catch((error) => console.log(error));
							}
						}} />
          </div>
          <div className="form-row">
            <div className="col">
              <label htmlFor="duration">Duration</label>
              <input id="duration" name="duration" type="text" required className="form-control" value={state.duration} onChange={(e) => setState({ ...state, duration: e.target.value })} placeholder="Enter a value in minutes" autoComplete="off" />
            </div>
            <div className="col">
              <label htmlFor="servings">Servings</label>
              <input id="servings" name="servings" type="text" required className="form-control" value={state.servings} onChange={(e) => setState({ ...state, servings: e.target.value })} placeholder="E.g. number of people this would serve" autoComplete="off" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="ingredients_1">Ingredients</label>
            {
              state.ingredients.map((ingredient, index) => {
                return (
                  <div className="form-row" key={index}>
                    <div className="col col-md-9">
                      <input className="form-control" onChange={(e) => handleItemChange(e, index)} value={ingredient.name} name="name" placeholder="Ingredient name" autoComplete="off" />
                    </div>
                    <div className="col">
                      <input className="form-control" onChange={(e) => handleItemChange(e, index)} value={ingredient.quantity} name="quantity" placeholder="Quantity required" autoComplete="off" />
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-warning" onClick={(e) => {
												e.preventDefault();
												const newIngredients = [...state.ingredients];
												newIngredients.splice(index, 1);
												setState({ ...state, ingredients: newIngredients });
											}}><i className="far fa-trash-alt"></i></button>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={handleButtonClick}><i className="fas fa-plus"></i> Add ingredient</button>
          </div>
          <div className="form-group">
            <label htmlFor="instructions_!">Instructions</label>
            {
              state.instructions.map((instruction, index) => {
                return (
                  <div className="form-row" key={index}>
                    <div className="col">
                      <textarea className="form-control" onChange={(e) => {
												const newInstructions = [...state.instructions];
												newInstructions[index] = e.target.value;
												setState({ ...state, instructions: newInstructions });
											}} value={instruction}></textarea>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-warning" onClick={(e) => {
												e.preventDefault();
												const newInstructions = [...state.instructions];
												newInstructions.splice(index, 1);
												setState({ ...state, instructions: newInstructions });
											}}><i className="far fa-trash-alt"></i></button>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={(e) => {
							e.preventDefault();
							setState((prevState) => ({
								...prevState,
								instructions: [...prevState.instructions, ''],
							}));
						}}><i className="fas fa-plus"></i> Add instruction</button>
          </div>
          <div className="form-group">
            {state.disable ? (
		<button
			name="submit"
			type="submit"
			className="btn btn-success"
			disabled
		>
			<i className="fas fa-cloud-upload-alt"></i> Save recipe
		</button>
	) : (
		<button
			name="submit"
			type="submit"
			className="btn btn-success"
			onClick={handleButtonClick}
		>
			<i className="fas fa-cloud-upload-alt"></i> Save recipe
		</button>
	)}
          </div>
				{/* Form fields for recipe creation */}
			</form>
		</div>
	);
}

export default withAuth(RecipeCreate);
