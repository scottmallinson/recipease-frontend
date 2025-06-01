import axios, { AxiosInstance } from 'axios';
import { Recipe, PantryItem, ApiResponse, SaveRecipeRequest, UpdateRecipeRequest } from '../types';

class RecipeService {
	private recipe: AxiosInstance;

	constructor() {
		this.recipe = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/recipes`,
			withCredentials: true
		});
	}

	async getAllRecipes(): Promise<Recipe[]> {
		const { data } = await this.recipe.get<ApiResponse<Recipe[]>>('/');
		return data.data;
	}

	async createRecipe(recipe: Omit<Recipe, '_id' | 'created_at' | 'updated_at'>): Promise<Recipe> {
		const { data } = await this.recipe.post<ApiResponse<Recipe>>('/create', recipe);
		return data.data;
	}

	async uploadRecipeImage(file: FormData): Promise<string> {
		const { data } = await this.recipe.post<string>('/create/image', file);
		return data;
	}

	async updateRecipe(recipe: UpdateRecipeRequest): Promise<Recipe> {
		const { data } = await this.recipe.put<ApiResponse<Recipe>>('/update', recipe);
		return data.data;
	}

	async saveRecipe(request: SaveRecipeRequest): Promise<Recipe> {
		const { data } = await this.recipe.put<ApiResponse<Recipe>>('/save', request);
		return data.data;
	}

	async unsaveRecipe(request: SaveRecipeRequest): Promise<Recipe> {
		const { data } = await this.recipe.put<ApiResponse<Recipe>>('/unsave', request);
		return data.data;
	}

	async recipesByAllIngredients(pantry: PantryItem[]): Promise<Recipe[]> {
		const { data } = await this.recipe.post<ApiResponse<Recipe[]>>('/search', pantry);
		return data.data;
	}

	async getRecipeById(id: string): Promise<Recipe> {
		const { data } = await this.recipe.get<ApiResponse<Recipe>>(`/${id}`);
		return data.data;
	}

	async search(query: string): Promise<Recipe[]> {
		const { data } = await this.recipe.get<ApiResponse<Recipe[]>>(`/search?s=${query}`);
		return data.data;
	}
}

const recipe = new RecipeService();

export default recipe;
