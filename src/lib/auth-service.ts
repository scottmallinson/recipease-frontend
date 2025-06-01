import { User } from '../types';

interface LoginData {
	username: string;
	password: string;
}

const baseUrl = process.env.REACT_APP_API_URL || '';

const signup = async (user: LoginData): Promise<User> => {
	const { username, password } = user;
	const response = await fetch(`${baseUrl}/auth/signup`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	});
	return await response.json();
};

const login = async (user: LoginData): Promise<User> => {
	const { username, password } = user;
	const response = await fetch(`${baseUrl}/auth/login`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	});
	return await response.json();
};

const logout = async (): Promise<void> => {
	await fetch(`${baseUrl}/auth/logout`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({})
	});
};

const me = async (): Promise<User> => {
	const response = await fetch(`${baseUrl}/auth/me`, {
		credentials: 'include'
	});
	return await response.json();
};

const auth = { signup, login, logout, me };

export default auth;
