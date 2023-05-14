import { defineComponent } from "vue"
import '/src/assets/recipe.css'; // import the css file

const RecipeView = defineComponent({
  props: {
    model: {
      type: Object,
    },
    addFavorite: {
      type: Function
    },
    isAuthenticated: {
      type: Boolean,
      default: false
    },
  },

  setup(props) { 
    
    function addRecipe(event) {
      props.addFavorite();
      console.log(props.isAuthenticated);
      if (props.isAuthenticated) {  
        event.target.disabled = true;
        event.target.innerText = 'Already added!';
      }
    }

    function renderIngredients() {
      return props.model.recipe.ingredients.map((ingredient) => <div>{ingredient}</div>);
    }

    function renderInstructions() {
      return props.model.recipe.instructions.map((instruction) => <div>{instruction}</div>);
    }

    return function render() {
      return (
        (props.model.searching ?
          <div class="loadDiv"><span class="loader"></span></div>
          : (props.model.recipe ?
            (<div>
              <ul>
                <li>
                  <div><h2 className="h2">{props.model.recipe.title}</h2></div>
                  <button v-if={props.isAuthenticated} className="button" onClick={addRecipe}>Add to my favorites</button>
                  <div><h3>Ingredients</h3></div>
                  <div>{renderIngredients()}</div>
                  <div><h3>Instructions</h3></div>
                  <div>{renderInstructions()}</div>
                </li>
              </ul>
            </div>)
            : 
            <div>

            </div>)
        )
      );
    };
  },
});

export default RecipeView