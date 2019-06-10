import axios from "axios";

class RecipeService {
  constructor() {
    this.recipe = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/recipes`,
      withCredentials: true
    });
  }

  async getAllRecipes() {
    const { data } = await this.recipe
      .get('/');
    return data;
  }

  async createRecipe(recipe) {
    const { data } = await this.recipe
      .post('/create', recipe);
    return data;
  }

  async uploadRecipeImage(file) {
    const { data } = await this.recipe
      .post('/create/image', file);
    return data;
  }

  async updateRecipe(recipe) {
    const { data } = await this.recipe
      .put('/update', recipe);
    return data;
  }

  async saveRecipe(recipe) {
    const { data } = await this.recipe
      .put('/save', recipe);
    return data;
  }

  async unsaveRecipe(recipe) {
    const { data } = await this.recipe
      .put('/unsave', recipe);
    return data;
  }

  async recipesByAllIngredients(pantry) {
    const { data } = await this.recipe
      .post('/search', pantry);
    return data;
  }

  async getRecipeById(id) {
    const { data } = await this.recipe
      .get(`/${id}`);
    return data;
  }

  async search(query) {
    const { data } = await this.recipe
      .get(`/search?s=${query}`);
    return data;
  }
}

const recipe = new RecipeService();

export default recipe;
