import { defineComponent } from "vue"

const RecipeView = defineComponent({
  props: {
    model: {
      type: Object,
    }
  },
  
  setup(props) {
    function renderIngredients() {
      return props.model.recipe.ingredients.map( (ingredient) => <div>{ ingredient }</div> );
    }
    function renderInstructions() {
      return props.model.recipe.instructions.map( (instruction) => <div>{ instruction }</div> );
    }

    return function render() {
      return (
        ( props.model.searching ? 
          <div class="loadDiv"><span class="loader"></span></div>
        : ( props.model.recipe ? 
            (<div><div><b>{ props.model.recipe.title }</b></div>
            <div><b>Ingredients</b></div>
            <div class="block">{ renderIngredients() }</div>
            <div><b>Instructions</b></div>
            <div class="block">{ renderInstructions() }</div></div>)
          : <div>Search for a recipe!</div>)
        )
      );
    };
  },
});

export default RecipeView