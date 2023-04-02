import { generateRecipe } from "./utilities.js"

class SearchModel {
  constructor() {
    this.ingredients = {};
    this.recipe = null;
  };

  toggleIngredient( ingredient ) {
    
    if (!Object.keys(allIngredients).includes(ingredient))
      return;
    if (Object.keys(this.ingredients).includes(ingredient)) {
      const { [ingredient]: _, ...rest } = this.ingredients;
      this.ingredients = rest;
    } else {
      this.ingredients = { ...this.ingredients, [ingredient]: allIngredients[ingredient] };
    }
  }


}

export class RecipeModel {
  constructor(text) {
    let begin = 0;
    for (0; text.at(begin) == '\n'; begin++ );
    text = text.substring(begin).trim();
    let ingredientBegin = text.indexOf('Ingredients');
    let instructionsBegin = text.indexOf('Instructions');
    this.title = text.substring(0, text.indexOf('\n'));
    this.ingredients = text.substring(text.indexOf('\n') + 1, instructionsBegin).split('\n').filter( (s) => s != "" );
    this.instructions = text.substring(instructionsBegin + 1).split('\n').filter( (s) => s != "" );
    const [_a, ...rest] = this.ingredients;
    this.ingredients = rest;
    const [_b, ...rest2] = this.instructions;
    this.instructions = rest2;
  }
}

export const allIngredients = {
  eggplant: '127814',
  tomatoes: '127813',
  bread: '127838',
  potatoes: '129364'
};

export default SearchModel