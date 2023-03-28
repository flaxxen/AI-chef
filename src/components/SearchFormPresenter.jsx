import { defineComponent } from "vue"
import SearchFormView from "../views/SearchFormView"

const SearchFormPresenter = defineComponent({
  


  setup(props) {
    function print(e) {
        console.log(e);
    }

    return function renderACB() {
        console.log("IN HERE");
      return (
        <SearchFormView toggleIngredient={ print }/>
      );
    };
  },
});

export default SearchFormPresenter