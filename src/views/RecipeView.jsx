import { defineComponent } from "vue"

const RecipeView = defineComponent({
  props: {
    recipe: {
      type: Object,
    }
  },
  
  setup(props) {
    function renderIngredients() {
      return props.recipe.ingredients.map( (ingredient) => <div>{ ingredient }</div> );
    }
    function renderInstructions() {
      return props.recipe.instructions.map( (instruction) => <div>{ instruction }</div> );
    }

    return function render() {
      return (
        <div>
          <div><b>{ props.recipe.title }</b></div>
          <div><b>Ingredients</b></div>
          <div class="block">{ renderIngredients() }</div>
          <div><b>Instructions</b></div>
          <div class="block">{ renderInstructions() }</div>
        </div>
      );
    };
  },
});

export default RecipeView