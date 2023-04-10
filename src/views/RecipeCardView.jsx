import { defineComponent } from "vue"

const RecipeCardView = defineComponent({
  
  props: {
    numberOfStars: Number,
    title: String,
    ingredients: Array,
    clickCard: Function, 
    id: Number,
  },

  setup(props) {
    function clicked(e) {
        props.clickCard(props.id);
    }

    return function render() {
      return (
        <div class="recipeCard" onClick={ clicked }>
            <div> <div style={ "float: right" }>({props.numberOfStars})&#11088;</div></div>
            <div><strong>{ props.title }</strong></div>
            <div>{ props.ingredients }</div>
        </div>
      );
    };
  },
});

export default RecipeCardView