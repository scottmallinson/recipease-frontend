import axios from "axios";

class RecipeService {
  constructor() {
    this.recipe = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/recipes`,
      withCredentials: true
    });
  }

  getAllRecipes() {
    return this.recipe
      .get('/')
      .then(({ data }) => data)
  }

  createRecipe(recipe) {
    return this.recipe
      .post('/create', recipe)
      .then(({ data }) => data)
  }

  updateRecipe(recipe) {
    return this.recipe
      .put('/update', recipe)
      .then(({ data }) => data)
  }

  saveRecipe(recipe) {
    return this.recipe
      .put('/save', recipe)
      .then(({ data }) => data)
  }

  recipesByAllIngredients(pantry) {
    return this.recipe
      .post('/search', pantry)
      .then(({ data }) => data)
  }

  getRecipeById(id) {
    return this.recipe
      .get(`/${id}`)
      .then(({ data }) => data)
  }

  search(query) {
    return this.recipe
      .get(`/search?s=${query}`)
      .then(({ data }) => data)
  }
}

const recipe = new RecipeService();

export default recipe;
