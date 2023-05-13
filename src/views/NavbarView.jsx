import { defineComponent, ref } from "vue"; 
import { useRoute, useRouter } from "vue-router";
import '/src/assets/navbar.css'; 
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const NavbarView = defineComponent({
  props: {
    logoutFunction: {
      type: Function
    },
    user: {
      type: Object
    }
  },

  setup(props) {
    return () => {
      if (props.user) {
        return (
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto"></ul>
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <button class="btn btn-outline-danger" onClick={props.logoutFunction}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
      } else {
        return null; // Navbar only rendered if user is logged in.
      }
    };
  },
});

export default NavbarView;