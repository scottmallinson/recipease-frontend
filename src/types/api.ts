// API request types
export interface SaveRecipeRequest {
	recipeId: string;
	userId: string;
}

export interface UpdateRecipeRequest {
	_id: string;
	name: string;
	description: string;
	photoUrl: string;
	duration: string;
	ingredients: {
		name: string;
		quantity: string;
	}[];
	instructions: string[];
	servings: string;
}
