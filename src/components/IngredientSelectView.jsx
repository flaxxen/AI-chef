import { defineComponent } from "vue"

const IngredientSelectorView = defineComponent({
  props: {
    toggleIngredient: {
      type: Function,
    },
  },
  
  setup(props) {
    function toggle(e) {
        toggleIngredient(e.target.id);
    }

    return function render() {
      return (
        <div>
          <span class="ingredient" id="Tomatoes" onClick={toggle}>Tomatoes &#127813;</span>
          <span class="ingredient" id="Eggplant" onClick={toggle}>Eggplant &#127814;</span>
          <span class="ingredient" id="Bread" onClick={toggle}>Bread &#127838;</span>
          <span class="ingredient" id="Potatoes" onClick={toggle}>Potatoes &#129364;</span>
        </div>
      );
    };
  },
});

export default IngredientSelectorView