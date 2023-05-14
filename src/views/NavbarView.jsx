import { defineComponent} from "vue"; 
import { RouterLink } from 'vue-router'
import '/src/assets/navbar.css';

const NavbarView = defineComponent({
  props: {
    logoutFunction: {
      type: Function,
    },
    user: {
      type: Object,
    },
    toggleMenu: {
      type: Function
    },
    open: {
      type: Boolean,
      default: false
    },
  },

  setup(props) {

    return function render() {
      return (
        <nav>
          <a>AI Chef</a>
          <div v-show={!props.open}>
            <ul>
              <li>
                <RouterLink to="/">Home</RouterLink>
              </li>
              {this.user ? (
                <>
                  <li>
                    <RouterLink to="/favorite">Favorite</RouterLink>
                  </li>
                  <li>
                    <button class = "logoutButton" onClick={this.logoutFunction}>Logout</button>
                  </li>
                </>
              ) : (
                <li>
                  <RouterLink to="/login">Login</RouterLink>
                </li>
              )}
            </ul>
          </div>
          <button class="hamburgerButton" onClick={props.toggleMenu}>
            ☰
          </button>

        </nav>
      )
    };
  }
});

export default NavbarView;
