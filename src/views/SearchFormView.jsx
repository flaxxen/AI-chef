import { defineComponent } from "vue"
import { allIngredients } from "../model.js";


const SearchFormView = defineComponent({
  props: {
    toggleIngredient: {
      type: Function,
    },
    search: {
      type: Function
    },
    activeIngredients: {
      type: Array
    }
  },
  
  setup( props ) {
    function toggle(e) {
      console.log(e.target.id);
      props.toggleIngredient(e.target.id);
    }

    function renderIngredients() {
      return Object.entries(allIngredients).map( ( [ key, value ] ) => 
        <div class={props.activeIngredients.includes(key) ? "ingredientOn" : "ingredientOff"} id={ key } onClick={ toggle }>{ key } { String.fromCodePoint(value) }</div>
      )
    }
    
    return function render() {
      return (
        
        <div class="searchForm">
          <h1>Welcome to the AI Chef!</h1>
          <h2>Customize your meal by choosing your favorite ingredients below.</h2>
            {}
          { renderIngredients() }
          <button class="createRecipieButton" onClick={ props.search }>Create recipe</button>
        </div>
      );
    };
  },
});

export default SearchFormView