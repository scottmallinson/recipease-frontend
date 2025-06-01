import { Recipe, PantryItem, ApiResponse, SaveRecipeRequest, UpdateRecipeRequest } from '../types';

const baseUrl = `${process.env.REACT_APP_API_URL}/recipes`;

const getAllRecipes = async (): Promise<Recipe[]> => {
	const response = await fetch(`${baseUrl}/`, {
		credentials: 'include'
	});
	const data: ApiResponse<Recipe[]> = await response.json();
	return data.data;
};

const createRecipe = async (recipe: Omit<Recipe, '_id' | 'created_at' | 'updated_at'>): Promise<Recipe> => {
	const response = await fetch(`${baseUrl}/create`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(recipe)
	});
	const data: ApiResponse<Recipe> = await response.json();
	return data.data;
};

const uploadRecipeImage = async (file: FormData): Promise<string> => {
	const response = await fetch(`${baseUrl}/create/image`, {
		method: 'POST',
		credentials: 'include',
		body: file
	});
	return await response.text();
};

const updateRecipe = async (recipe: UpdateRecipeRequest): Promise<Recipe> => {
	const response = await fetch(`${baseUrl}/update`, {
		method: 'PUT',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(recipe)
	});
	const data: ApiResponse<Recipe> = await response.json();
	return data.data;
};

const saveRecipe = async (request: SaveRecipeRequest): Promise<Recipe> => {
	const response = await fetch(`${baseUrl}/save`, {
		method: 'PUT',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(request)
	});
	const data: ApiResponse<Recipe> = await response.json();
	return data.data;
};

const unsaveRecipe = async (request: SaveRecipeRequest): Promise<Recipe> => {
	const response = await fetch(`${baseUrl}/unsave`, {
		method: 'PUT',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(request)
	});
	const data: ApiResponse<Recipe> = await response.json();
	return data.data;
};

const recipesByAllIngredients = async (pantry: PantryItem[]): Promise<Recipe[]> => {
	const response = await fetch(`${baseUrl}/search`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(pantry)
	});
	const data: ApiResponse<Recipe[]> = await response.json();
	return data.data;
};

const getRecipeById = async (id: string): Promise<Recipe> => {
	const response = await fetch(`${baseUrl}/${id}`, {
		credentials: 'include'
	});
	const data: ApiResponse<Recipe> = await response.json();
	return data.data;
};

const search = async (query: string): Promise<Recipe[]> => {
	const response = await fetch(`${baseUrl}/search?s=${query}`, {
		credentials: 'include'
	});
	const data: ApiResponse<Recipe[]> = await response.json();
	return data.data;
};

const recipe = { getAllRecipes, createRecipe, uploadRecipeImage, updateRecipe, saveRecipe, unsaveRecipe, recipesByAllIngredients, getRecipeById, search };

export default recipe;
