import { defineComponent } from "vue"
import MenuView from "../views/MenuView";

const Menu = defineComponent({
  
  props: {
    menuItems: Array
  },

  setup(props) {
    return function renderACB() {
      return (
        <MenuView menuItems={ props.menuItems }/>
      );
    };
  },
});

export default Menu