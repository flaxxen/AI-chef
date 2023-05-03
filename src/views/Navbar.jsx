import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import "./navbar.css"; // import the css file

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
          <a class="navbar-brand" href="#">AI Chef</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li
                class={`nav-item ${route.path === "/" ? "active" : ""}`}
                onClick={() => router.push("/")}
              >
                <a class="nav-link" href="#">
                  Home
                </a>
              </li>
              
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
