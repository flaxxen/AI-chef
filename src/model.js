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
    this.notifyObservers({removeFavorite: id});
  }

  update() {
    if (Array.isArray(this.favoriteRecipes))
      this.favoriteRecipes =[...this.favoriteRecipes];
    else
      this.favoriteRecipes = [];
  }

  addCurrentRecipeToFavorites() {
    if (this.favoriteRecipes && this.favoriteRecipes.some(r => r.id == this.recipe.id))
      return;

    // Create a copy of the current recipe
    const newRecipe = { ...this.recipe };
    this.favoriteRecipes = [...this.favoriteRecipes, newRecipe];

    this.notifyObservers({
      addFavorite: newRecipe,
      setIdCB: (id) => {
        // Find the newly added recipe in favoriteRecipes and update its id
        let index = this.favoriteRecipes.indexOf(newRecipe);
        if (index !== -1) {
          this.favoriteRecipes[index].id = id;
        }
      }, 
      updateModel: this.update
    });
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
    console.log("setting id " + id);
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