import { defineComponent } from "vue";
const FavoriteView = defineComponent({
  props: {
    favoriteRecipes: {
      type: Array,
      default: [],
    },
    removeFavorite: {
        type: Function,
    },
    search: {
        type: Function,
    },
    searching: {
      type: Boolean,
      default: false,
    },
    updateQuery: {
      type: Function,
    },
  },

  setup( props ) {
    function queryChanged(event) {
        props.updateQuery(event.target.value);
    }
    
    // Render all instructions
    function renderInstructions(instructions) {
      return (
        Object.values(instructions).map((instruction, index) => (
            <div key={index}>{instruction}</div>
        ))
      )
    }

    // Render all ingredients 
    function renderIngredients(ingredients) {
      return (
        Object.values(ingredients).map((ingredient, index) => (
          <div key={index}>{ingredient}</div>
        ))
      )
    }

    // Render all recipes
    function renderRecipes(){
      if (!props.favoriteRecipes)
        return; 
      return props.favoriteRecipes.map((recipe) => 
        <li key={recipe.id} class="favoriteList">
          <div>
            <div><h2 className="h2">{recipe.title}</h2></div>
            <button className="button" onClick={() => props.removeFavorite(recipe.id)}>Delete</button>
            <div>
              <h3>Ingredients:</h3>
              {renderIngredients(recipe.ingredients)}  
            </div>
            <div>
              <h3>Instructions:</h3>
              {renderInstructions(recipe.instructions)}
            </div>
          </div>  
        </li>
      )
    }

    return function render() {
      return (
        <div class="favoriteDiv">
          <h1 className="h1">My Favorite Recipes</h1>
          <input type="text" className="input" onChange={queryChanged} onkeypress = {queryChanged} onpaste = {queryChanged} oninput ={queryChanged} placeholder="Search my favorite recipe" />
          {props.favoriteRecipes.length > 0 ? 
            <div className="scroll-container">
              <ul>
                {renderRecipes()}
              </ul>
            </div>
          : props.searching ? 
            <div>No results found.</div>
          : <div>No favorite recipe.</div>
          }
        </div>
      )
    }
  }
})

export default FavoriteView;