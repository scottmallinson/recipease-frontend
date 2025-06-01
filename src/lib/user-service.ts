import axios, { AxiosInstance } from 'axios';
import { User, PantryItem, ApiResponse } from '../types';

class UserService {
	private user: AxiosInstance;

	constructor() {
		this.user = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/user`,
			withCredentials: true
		});
	}

	async getUser(id: string): Promise<User> {
		const { data } = await this.user.get<ApiResponse<User>>(`/profile/${id}`);
		return data.data;
	}

	async getSavedRecipes(id: string): Promise<User> {
		const { data } = await this.user.get<ApiResponse<User>>(`/${id}`);
		return data.data;
	}

	async updatePantry(_id: string, pantry: PantryItem[]): Promise<User> {
		const { data } = await this.user.put<ApiResponse<User>>('/pantry', pantry);
		return data.data;
	}
}

const user = new UserService();

export default user;
