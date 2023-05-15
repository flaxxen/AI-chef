import { sha256 } from "./utilities.js"
import { getAuth } from "firebase/auth";

class SearchModel {
  constructor(favorites) {
    this.ingredients = {};
    this.recipe = null;
    this.searching = false;
    this.favoriteRecipes = favorites;
    this.observers = [];
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
  setAllFavorites(favorites) {
    this.favoriteRecipes = favorites;
  }

  removeFromFavorites(id) {
    if (!this.favoriteRecipes.some(r => r.id === id))
      return;

    this.favoriteRecipes = this.favoriteRecipes.filter(r => r.id != id);
  }

  addCurrentRecipeToFavorites() {
    if (this.favoriteRecipes && this.favoriteRecipes.some(r => r.id == this.recipe.id))
      return;
    
    this.favoriteRecipes = [...this.favoriteRecipes, this.recipe];
    this.notifyObservers({addFavorite: this.recipe, setIdCB: this.recipe.setId});
  }

  addObserver(callback) {
		this.observers = [...this.observers, callback];
	}
	
	removeObserver(callback) {
		this.observers = this.observers.filter(function not_equal_CB(element) { element != callback } );
	}

  notifyObservers(payload) {
    function invokeObserverCB(obs) {
			try {
				obs(payload);
			} catch(err) {
				console.error(err);
			}
		}
		
		this.observers.forEach(invokeObserverCB);
  }
}

export class RecipeModel {
  constructor(text) {
    let begin = 0;
    for (0; text.at(begin) == '\n'; begin++ );
    text = text.substring(begin).trim();
    let instructionsBegin = text.indexOf('Instructions');
    this.title = text.substring(0, text.indexOf('\n'));
    this.ingredients = text.substring(text.indexOf('\n') + 1, instructionsBegin).split('\n').filter( (s) => s != "" );
    this.instructions = text.substring(instructionsBegin + 1).split('\n').filter( (s) => s != "" );
    const [_a, ...rest] = this.ingredients;
    this.ingredients = rest;
    const [_b, ...rest2] = this.instructions;
    this.instructions = rest2;
    this.id = "";
  }
  setId(id) {
    this.id = id;
  }
}

export const allIngredients = {
  eggplant: '127814',
  tomatoes: '127813',
  bread: '127838',
  potatoes: '129364',

  broccoli:'129382',
  eggs: '129370',
  carrots: '129365',
  bacon: '129363',
  avocado: '129361',
  cucumber: '129362',
  chicken: '128036',
  rice: '127834',
  banana: '127820',
  apples: '127822'

};

export default SearchModel