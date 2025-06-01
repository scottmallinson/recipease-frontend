import { User, PantryItem } from '../types';

const getUser = async (id: string): Promise<User> => {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/user/profile/${id}`, {
		credentials: 'include'
	});
	const data = await response.json();
	return data.data;
};

const getSavedRecipes = async (id: string): Promise<User> => {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
		credentials: 'include'
	});
	const data = await response.json();
	return data.data;
};

const updatePantry = async (_id: string, pantry: PantryItem[]): Promise<User> => {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/user/pantry`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(pantry)
	});
	const data = await response.json();
	return data.data;
};

const user = { getUser, getSavedRecipes, updatePantry };

export default user;
