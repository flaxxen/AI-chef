import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import '/src/assets/navbar.css'; // import the css file

export default defineComponent({
  name: "Navbar",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem("user");
      router.push("/login");
    };

    return () => (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
      
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <button class="btn btn-outline-danger" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  },
});
