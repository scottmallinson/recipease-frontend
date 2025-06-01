import axios, { AxiosInstance } from 'axios';
import { User } from '../types';

interface LoginData {
	username: string;
	password: string;
}

class Auth {
	private auth: AxiosInstance;

	constructor() {
		this.auth = axios.create({
			baseURL: process.env.REACT_APP_API_URL,
			withCredentials: true
		});
	}

	async signup(user: LoginData): Promise<User> {
		const { username, password } = user;
		const { data } = await this.auth.post('/auth/signup', { username, password });
		return data;
	}

	async login(user: LoginData): Promise<User> {
		const { username, password } = user;
		const { data } = await this.auth.post('/auth/login', { username, password });
		return data;
	}

	async logout(): Promise<void> {
		const response = await this.auth.post('/auth/logout', {});
		return response.data;
	}

	async me(): Promise<User> {
		const response = await this.auth.get('/auth/me');
		return response.data;
	}
}

const auth = new Auth();

export default auth;
