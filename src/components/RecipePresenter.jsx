import { defineComponent } from "vue"
import RecipeView from '../views/RecipeView.jsx'

const Recipe = defineComponent({
  
  props: {
    model: {
      type: Object,
    }, 
  },

  setup( props ) {
    return function render() {
      return (
        ( props.model.recipe ? <RecipeView recipe={ props.model.recipe }/> : <div>Nothing</div>)
      );
    };
  },
});

export default Recipe