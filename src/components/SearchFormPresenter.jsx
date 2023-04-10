import { defineComponent } from "vue"
import SearchFormView from "../views/SearchFormView"

const SearchFormPresenter = defineComponent({
  props: {
    model: { 
      type: Object,
    },
    search: {
      type: Function,
    } 
  },

  setup( props ) {
    function toggleIngredient( ingredient ) {
        props.model.toggleIngredient( ingredient );
    }

    function search() {
      props.search();
    }

    return function render() {
      return (
        <SearchFormView 
          activeIngredients={ Object.keys( props.model.ingredients ) }
          search={ search } 
          toggleIngredient={ toggleIngredient }/>
      );
    };
  },
});

export default SearchFormPresenter