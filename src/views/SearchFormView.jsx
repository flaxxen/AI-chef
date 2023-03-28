import { defineComponent } from "vue"

const SearchFormView = defineComponent({
  props: {
    toggleIngredient: {
      type: Function,
    }
  },
  
  setup(props) {
    function toggle(e) {
        props.toggleIngredient(e.target.id);
    }

    return function render() {
      return (
        <div>
          <span class="ingredient" id="Tomatoes" onClick={toggle}>Tomatoes &#127813;</span>
          <span class="ingredient" id="Eggplant" onClick={toggle}>Eggplant &#127814;</span>
          <span class="ingredient" id="Bread" onClick={toggle}>Bread &#127838;</span>
          <span class="ingredient" id="Potatoes" onClick={toggle}>Potatoes &#129364;</span>
          <button>Create recipe</button>
        </div>
      );
    };
  },
});

export default SearchFormView