import { defineComponent } from "vue"
import { RouterLink } from "vue-router";


const MenuView = defineComponent({
  props: {
    menuItems: {
      type: Array,
    },
  },
  
  setup( props ) {
    function getLinks() {
      return props.menuItems.map( 
          item => <RouterLink to={ item.path }>{ item.name } </RouterLink>
        );
    }

    return function render() {
      return (
        <div>
          { getLinks() } 
        </div>
      );
    };
  },
});

export default MenuView