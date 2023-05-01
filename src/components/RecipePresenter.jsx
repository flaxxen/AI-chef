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
        <RecipeView model={ props.model }/> 
      );
    };
  },
});

export default Recipe