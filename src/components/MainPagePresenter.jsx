import { defineComponent, reactive } from "vue"
import SearchForm from "./SearchFormPresenter.jsx"
import Recipe from "./RecipePresenter.jsx"
import { generateRecipe } from "../utilities.js";
import { RecipeModel } from "../model.js";

const MainPage = defineComponent({
  props: {
    model: Object
  },

  setup( props ) {
    console.log(props.model.favoriteRecipes);
    const model = reactive( props.model );

    function searchForRecipe() {
      model.searching = true;
      const recipePromise = generateRecipe( Object.keys(model.ingredients) );

      Promise.resolve(recipePromise)
      .then( (value) => {model.recipe = new RecipeModel(value); model.searching = false; } )
      .catch( (error) => console.log( error ) ); 
    }

    return function render() {
      return (
        <div>
        <SearchForm model={ model } search={ searchForRecipe }/>
        <Recipe model={ model } />
        </div>
      );
    };
  },
});

export default MainPage