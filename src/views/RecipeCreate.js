import React, { Component } from "react";

export default class Recipes extends Component {
  state = {
    recipe: []
  }

  render() {
    return (
      <div>
        <h1>Page for creating a recipe</h1>
        <form>
          <input type="text" name="name" placeholder="name" required />
          <textarea name="description" placeholder="description" required></textarea>
          <input type="text" name="duration" placeholder="duration" required />
          <input type="text" name="servings" placeholder="servings" required />
          <h3>Ingredients</h3>
          <input type="text" name="ingredient1name" placeholder="Ingredient name" />
          <input type="text" name="ingredient1quantity" placeholder="Ingredient quantity" />
          <input type="text" name="ingredient2name" placeholder="Ingredient name" />
          <input type="text" name="ingredient2quantity" placeholder="Ingredient quantity" />
          <input type="text" name="ingredient3name" placeholder="Ingredient name" />
          <input type="text" name="ingredient3quantity" placeholder="Ingredient quantity" />
          <input type="text" name="ingredient4name" placeholder="Ingredient name" />
          <input type="text" name="ingredient4quantity" placeholder="Ingredient quantity" />
          <input type="text" name="instruction1" placeholder="Instruction" />
          <input type="text" name="instruction2" placeholder="Instruction" />
          <input type="text" name="instruction3" placeholder="Instruction" />
          <input type="text" name="instruction4" placeholder="Instruction" />
          <button>Save recipe</button> 
        </form>
        
      </div>
    );
  }
}
