// User types
export interface User {
	_id: string;
	username: string;
	pantry?: PantryItem[];
	createdRecipes?: Recipe[];
	savedRecipes?: Recipe[];
}

// Recipe types
export interface Recipe {
	_id: string;
	creatorId: User | string;
	name: string;
	description: string;
	photoUrl: string;
	duration: string;
	ingredients: Ingredient[];
	instructions: string[];
	servings: string;
	updated_at: Date;
	created_at: Date;
}

export interface Ingredient {
	name: string;
	quantity: string;
}

export interface PantryItem {
	name: string;
	quantity: string;
}

// Auth context types
export interface AuthContextType {
	isLoggedin: boolean;
	user: User | null;
	isLoading: boolean;
	signup: (user: { username: string; password: string }) => void;
	login: (user: { username: string; password: string }) => void;
	logout: () => void;
}

// API Response types
export interface ApiResponse<T> {
	data: T;
	message?: string;
}

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
	ingredients: Ingredient[];
	instructions: string[];
	servings: string;
}

// Component prop types
export interface WithAuthProps {
	isLoggedin: boolean;
	user: User | null;
	signup: (user: { username: string; password: string }) => void;
	login: (user: { username: string; password: string }) => void;
	logout: () => void;
}

export interface RouteProps {
	children: React.ReactNode;
}
