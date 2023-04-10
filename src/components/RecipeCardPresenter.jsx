import { defineComponent } from "vue"

const RecipeCard = defineComponent({
  
  props: {
    model: {
      type: Object,
    }, 
  },

  setup( props ) {
    return function render() {
      return (
        <RecipeView recipe={ props.model.recipe }/>
      );
    };
  },
});

export default RecipeCard